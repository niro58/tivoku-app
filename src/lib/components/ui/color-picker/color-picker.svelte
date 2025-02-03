<script lang="ts">
	import { run } from 'svelte/legacy';

	import { createEventDispatcher, onMount, tick } from 'svelte';
	import { type RgbaColor, type HsvaColor, type Colord, colord } from 'colord';

	import PickerIndicator from './variant/default/PickerIndicator.svelte';
	import TextInput from './variant/default/TextInput.svelte';
	import Input from './variant/default/Input.svelte';
	import Wrapper from './variant/default/Wrapper.svelte';
	import NullabilityCheckbox from './variant/default/NullabilityCheckbox.svelte';
	import type { A11yColor, Components } from './types';
	import { defaultTexts, type A11yTextsPartial, type TextsPartial } from './texts';
	import { trapFocus, type Trap } from './trapFocus';

	const dispatch = createEventDispatcher<{
		input: {
			hsv: HsvaColor | undefined;
			rgb: RgbaColor | undefined;
			hex: string | undefined;
			color: Colord | undefined;
		};
	}>();

	interface Props {
		components?: Partial<Components>;
		label?: string;
		name?: string | undefined;
		nullable?: boolean;
		rgb?: RgbaColor | undefined;
		hsv?: HsvaColor | undefined;
		hex?: string | undefined;
		color?: Colord | undefined;
		isDark?: boolean;
		isAlpha?: boolean;
		isDialog?: boolean;
		isOpen?: boolean;
		position?: 'fixed' | 'responsive' | 'responsive-x' | 'responsive-y';
		isTextInput?: boolean;
		textInputModes?: Array<'hex' | 'rgb' | 'hsv'>;
		sliderDirection?: 'horizontal' | 'vertical';
		disableCloseClickOutside?: boolean;
		a11yColors?: Array<A11yColor>;
		a11yLevel?: 'AA' | 'AAA';
		texts?: TextsPartial | undefined;
		a11yTexts?: A11yTextsPartial | undefined;
	}

	let {
		components = {},
		label = 'Choose a color',
		name = undefined,
		nullable = false,
		rgb = $bindable(nullable ? undefined : { r: 255, g: 0, b: 0, a: 1 }),
		hsv = $bindable(nullable ? undefined : { h: 0, s: 100, v: 100, a: 1 }),
		hex = $bindable(nullable ? undefined : '#ff0000'),
		color = $bindable(undefined),
		isDark = $bindable(false),
		isAlpha = true,
		isDialog = true,
		isOpen = $bindable(!isDialog),
		position = 'fixed',
		isTextInput = true,
		textInputModes = ['hex', 'rgb', 'hsv'],
		sliderDirection = 'vertical',
		disableCloseClickOutside = false,
		a11yColors = [{ bgHex: '#ffffff' }],
		a11yLevel = 'AA',
		texts = undefined,
		a11yTexts = undefined
	}: Props = $props();


	let _rgb: RgbaColor = $state({ r: 255, g: 0, b: 0, a: 1 });
	let _hsv: HsvaColor = $state({ h: 0, s: 100, v: 100, a: 1 });
	let _hex: string = $state('#ff0000');

	let isUndefined = $state(false);
	let _isUndefined = isUndefined;

	let spanElement: HTMLSpanElement | undefined = $state();
	let labelElement: HTMLLabelElement | undefined = $state();
	let wrapper: HTMLElement | undefined = $state();

	let trap: Trap | undefined = undefined;
	const wrapperPadding: number = 12;

	const default_components: Components = {
		pickerIndicator: PickerIndicator,
		textInput: TextInput,
		input: Input,
		nullabilityCheckbox: NullabilityCheckbox,
		wrapper: Wrapper
	};

	function getComponents() {
		return {
			...default_components,
			...components
		};
	}

	function getTexts() {
		return {
			label: {
				...defaultTexts.label,
				...texts?.label
			},
			color: {
				...defaultTexts.color,
				...texts?.color
			},
			changeTo: texts?.changeTo ?? defaultTexts.changeTo
		};
	}

	function mousedown({ target }: MouseEvent) {
		if (!labelElement || !wrapper) return;
		if (isDialog) {
			if (labelElement.contains(target as Node) || labelElement.isSameNode(target as Node)) {
				isOpen = !isOpen;
			} else if (isOpen && !wrapper.contains(target as Node) && !disableCloseClickOutside) {
				isOpen = false;
			}
		}
	}

	function keyup({ key, target }: KeyboardEvent) {
		if (!labelElement || !wrapper || !spanElement) return;

		if (!isDialog) {
			return;
		} else if (key === 'Enter' && labelElement.contains(target as Node)) {
			isOpen = !isOpen;
			setTimeout(() => {
				if (!wrapper) return;
				trap = trapFocus(wrapper);
			});
		} else if (key === 'Escape' && isOpen) {
			isOpen = false;
			if (spanElement.contains(target as Node)) {
				labelElement?.focus();
				trap?.destroy();
			}
		}
	}

	/**
	 * using a function seems to trigger the exported value change only once when all of them has been updated
	 * and not just after the hsv change
	 */
	function updateColor() {
		if (isUndefined && !_isUndefined) {
			_isUndefined = true;
			hsv = rgb = hex = undefined;
			dispatch('input', { color, hsv, rgb, hex });
			return;
		} else if (_isUndefined && !isUndefined) {
			_isUndefined = false;
			hsv = _hsv;
			rgb = _rgb;
			hex = _hex;
			dispatch('input', { color, hsv, rgb, hex });
			return;
		}
		if (!hsv && !rgb && !hex) {
			isUndefined = true;
			_isUndefined = true;
			dispatch('input', { color: undefined, hsv, rgb, hex });
			return;
		}
		if (
			hsv &&
			rgb &&
			hsv.h === _hsv.h &&
			hsv.s === _hsv.s &&
			hsv.v === _hsv.v &&
			hsv.a === _hsv.a &&
			rgb.r === _rgb.r &&
			rgb.g === _rgb.g &&
			rgb.b === _rgb.b &&
			rgb.a === _rgb.a &&
			hex === _hex
		) {
			return;
		}

		isUndefined = false;

		// reinitialize empty alpha values
		if (hsv && hsv.a === undefined) hsv.a = 1;
		if (_hsv.a === undefined) _hsv.a = 1;
		if (rgb && rgb.a === undefined) rgb.a = 1;
		if (_rgb.a === undefined) _rgb.a = 1;
		if (hex?.substring(7) === 'ff') hex = hex.substring(0, 7);
		if (hex?.substring(7) === 'ff') hex = hex.substring(0, 7);

		// triggers color computation from the color that changed or if it is the only color defined
		if (
			hsv &&
			(hsv.h !== _hsv.h ||
				hsv.s !== _hsv.s ||
				hsv.v !== _hsv.v ||
				hsv.a !== _hsv.a ||
				(!rgb && !hex))
		) {
			color = colord(hsv);
			rgb = color.toRgb();
			hex = color.toHex();
		} else if (
			rgb &&
			(rgb.r !== _rgb.r ||
				rgb.g !== _rgb.g ||
				rgb.b !== _rgb.b ||
				rgb.a !== _rgb.a ||
				(!hsv && !hex))
		) {
			color = colord(rgb);
			hex = color.toHex();
			hsv = color.toHsv();
		} else if (hex && (hex !== _hex || (!hsv && !rgb))) {
			color = colord(hex);
			rgb = color.toRgb();
			hsv = color.toHsv();
		}

		if (color) {
			isDark = color.isDark();
		}

		if (!hex) return;

		// update old colors
		_hsv = Object.assign({}, hsv);
		_rgb = Object.assign({}, rgb);
		_hex = hex;
		_isUndefined = isUndefined;

		dispatch('input', { color, hsv, rgb, hex });
	}

	run(() => {
		if (hsv || rgb || hex) {
			updateColor();
		}
	});

	$effect(()=>{
		isUndefined, updateColor();
	})

	function updateLetter(letter: 'h' | 'a') {
		return (e: { detail: number }) => {
			if (!hsv) hsv = { ..._hsv };
			hsv[letter] = e.detail;
		};
	}

	function updateLetters<T extends Array<'h' | 's' | 'v'>>(letters: T) {
		return (e: { detail: Pick<HsvaColor, T[number]> }) => {
			if (!hsv) hsv = { ..._hsv };
			letters.forEach((letter: T[number]) => {
				if (hsv) hsv[letter] = e.detail[letter];
			});
		};
	}

	async function wrapperBoundaryCheck() {
		await tick();

		if (position !== 'fixed' && isOpen && isDialog && labelElement && wrapper) {
			const rect = wrapper.getBoundingClientRect();
			const labelRect = labelElement.getBoundingClientRect();

			if (position === 'responsive' || position === 'responsive-y') {
				if (labelRect.top + rect.height + wrapperPadding > innerHeight) {
					wrapper.style.top = `-${rect.height + wrapperPadding}px`;
				} else {
					wrapper.style.top = `${labelRect.height + wrapperPadding}px`;
				}
			}

			if (position === 'responsive' || position === 'responsive-x') {
				if (labelRect.left + rect.width + wrapperPadding > innerWidth) {
					wrapper.style.left = `-${rect.width - labelRect.width + wrapperPadding}px`;
				} else {
					wrapper.style.left = `${wrapperPadding}px`;
				}
			}
		}
	}

	run(() => {
		innerWidth, innerHeight, isOpen, wrapperBoundaryCheck();
	});

	const SvelteComponent_4 = $derived(getComponents().wrapper);
</script>

<svelte:window onmousedown={mousedown} onkeyup={keyup} onscroll={wrapperBoundaryCheck} />

<span bind:this={spanElement} class="color-picker {sliderDirection}">
	{#if isDialog}
		{@const SvelteComponent = getComponents().input}
		<SvelteComponent bind:labelElement isOpen {hex} {label} {name} />
	{:else if name}
		<input type="hidden" value={hex} {name} />
	{/if}
	<SvelteComponent_4 bind:wrapper {isOpen} {isDialog}>
		{#if nullable}
			{@const SvelteComponent_1 = getComponents().nullabilityCheckbox}
			<SvelteComponent_1 bind:isUndefined texts={getTexts()} />
		{/if}
		<Picker
			components={getComponents()}
			h={hsv?.h ?? _hsv.h}
			s={hsv?.s ?? _hsv.s}
			v={hsv?.v ?? _hsv.v}
			on:input={updateLetters(['s', 'v'])}
			{isDark}
			texts={getTexts()}
		/>
		<div class="h">
			<!-- <Slider
				min={0}
				max={360}
				step={1}
				value={hsv?.h ?? _hsv.h}
				on:input={updateLetter('h')}
				direction={sliderDirection}
				reverse={sliderDirection === 'vertical'}
				ariaLabel={getTexts().label.h}
			/> -->
		</div>
		{#if isAlpha}
			<div class="a" style:--alphaless-color={(hex ? hex : _hex).substring(0, 7)}>
				<!-- <Slider
					min={0}
					max={1}
					step={0.01}
					value={hsv?.a ?? _hsv.a}
					on:input={updateLetter('a')}
					direction={sliderDirection}
					reverse={sliderDirection === 'vertical'}
					ariaLabel={getTexts().label.a}
				/> -->
			</div>
		{/if}
		{#if isTextInput}
			{@const SvelteComponent_2 = getComponents().textInput}
			<SvelteComponent_2
				hex={hex ?? _hex}
				rgb={rgb ?? _rgb}
				hsv={hsv ?? _hsv}
				on:input={({ detail }) => {
					if (detail.hsv) {
						hsv = detail.hsv;
					} else if (detail.rgb) {
						rgb = detail.rgb;
					} else if (detail.hex) {
						hex = detail.hex;
					}
				}}
				{isAlpha}
				{textInputModes}
				texts={getTexts()}
			/>
		{/if}
		{#if getComponents().a11yNotice}
			{@const SvelteComponent_3 = getComponents().a11yNotice}
			<SvelteComponent_3
				components={getComponents()}
				{a11yColors}
				hex={hex || '#00000000'}
				{a11yTexts}
				{a11yLevel}
			/>
		{/if}
	</SvelteComponent_4>
</span>

<style>
	span {
		position: relative;
		color: var(--cp-text-color, var(--cp-border-color));

		--alpha-grid-bg: linear-gradient(45deg, #eee 25%, #0000 25%, #0000 75%, #eee 75%) 0 0 / 10px
				10px,
			linear-gradient(45deg, #eee 25%, #0000 25%, #0000 75%, #eee 75%) 5px 5px / 10px 10px;
	}

	.h,
	.a {
		display: inline-flex;
		justify-content: center;
		--track-height: var(--slider-width, 10px);
		--track-width: var(--picker-height, 200px);
		--track-border: none;
		--thumb-size: calc(var(--slider-width, 10px) - 3px);
		--thumb-background: white;
		--thumb-border: 1px solid black;
		--margin-block: 0;

		--gradient-direction: 0.5turn;
	}
	.horizontal .h,
	.horizontal .a {
		--track-width: calc(var(--picker-width, 200px) - 12px);

		--gradient-direction: 0.25turn;
		margin: 4px 6px;
	}
	.horizontal .h {
		margin-top: 8px;
	}
	.vertical .h,
	.vertical .a {
		margin-left: 3px;
	}

	.h {
		grid-area: hue;

		--gradient-hue: #ff1500fb, #ffff00 17.2%, #ffff00 18.2%, #00ff00 33.3%, #00ffff 49.5%,
			#00ffff 51.5%, #0000ff 67.7%, #ff00ff 83.3%, #ff0000;
		--track-background: linear-gradient(var(--gradient-direction), var(--gradient-hue));
	}

	.a {
		grid-area: alpha;
		margin-top: 2px;

		--track-background: linear-gradient(
				var(--gradient-direction),
				rgba(0, 0, 0, 0),
				var(--alphaless-color)
			),
			var(--alpha-grid-bg);
	}

	span :global(.sr-only) {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}
</style>
