<script lang="ts">
	import { run, preventDefault, nonpassive } from 'svelte/legacy';

	import { createEventDispatcher } from 'svelte';
	import type { Components } from './types';
	import type { Texts } from './texts';

	import { colord } from 'colord';

	const dispatch = createEventDispatcher<{
		input: {
			s: number;
			v: number;
		};
	}>();

	interface Props {
		/** customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice */
		components: Components;
		/** hue value */
		h: number;
		/** saturation value */
		s: number;
		/** vibrance value */
		v: number;
		/** indicator whether the selected color is light or dark */
		isDark: boolean;
		/** all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts) */
		texts: Texts;
	}

	let { components, h, s = $bindable(), v = $bindable(), isDark, texts }: Props = $props();

	let picker: HTMLDivElement | undefined = $state();

	let isMouseDown = false;
	let focused = false;

	let pickerColorBg: string | undefined = $state();
	let pos = $state({ x: 100, y: 0 });

	run(() => {
		if (typeof h === 'number') pickerColorBg = colord({ h, s: 100, v: 100, a: 1 }).toHex();
	});

	function clamp(value: number, min: number, max: number): number {
		return Math.min(Math.max(min, value), max);
	}

	function onClick(e: { clientX: number; clientY: number }) {
		if (!picker) return;

		const { width, left, height, top } = picker.getBoundingClientRect();
		const mouse = {
			x: clamp(e.clientX - left, 0, width),
			y: clamp(e.clientY - top, 0, height)
		};

		s = clamp(mouse.x / width, 0, 1) * 100;
		v = clamp((height - mouse.y) / height, 0, 1) * 100;
	}

	function pickerMousedown(e: MouseEvent) {
		if (e.button === 0) {
			isMouseDown = true;
			onClick(e);
		}
	}

	function mouseUp() {
		isMouseDown = false;
	}

	function mouseMove(e: MouseEvent) {
		if (isMouseDown) onClick(e);
	}

	function mouseDown(e: MouseEvent) {
		if (!(e.target as HTMLElement)?.isSameNode(picker || null)) {
			focused = false;
		}
	}

	function touch(e: TouchEvent) {
		e.preventDefault();
		onClick(e.changedTouches[0]);
	}

	run(() => {
		if (typeof s === 'number' && typeof v === 'number' && picker)
			pos = {
				x: s,
				y: 100 - v
			};
	});

	run(() => {
		dispatch('input', { s, v });
	});
</script>

<svelte:window onmouseup={mouseUp} onmousedown={mouseDown} onmousemove={mouseMove} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="picker"
	bind:this={picker}
	onmousedown={(e) => {
		e.preventDefault();
		pickerMousedown(e);
	}}
	ontouchstart={(e) => {
		e.preventDefault();
		touch(e);
	}}
	ontouchmove={(e) => {
		e.preventDefault();
		touch(e);
	}}
	ontouchend={(e) => {
		e.preventDefault();
		touch(e);
	}}
	style:--picker-color-bg={pickerColorBg}
>
	<components.pickerIndicator {pos} {isDark} />
	<div class="s" style:--pos-y={pos.y}>
		<!-- <Slider
			bind:value={s}
			keyboardOnly
			ariaValueText={(value) => `${value}%`}
			ariaLabel={texts.label.s}
		/> -->
	</div>
	<div class="v" style:--pos-x={pos.x}>
		<!-- <Slider
			bind:value={v}
			keyboardOnly
			ariaValueText={(value) => `${value}%`}
			direction="vertical"
			ariaLabel={texts.label.v}
		/> -->
	</div>
</div>

<style>
	.picker {
		position: relative;
		display: inline-block;
		width: var(--picker-width, 200px);
		height: var(--picker-height, 200px);
		background: linear-gradient(#ffffff00, #000000ff),
			linear-gradient(0.25turn, #ffffffff, #00000000), var(--picker-color-bg);
		border-radius: var(--picker-radius, 8px);
		outline: none;
		user-select: none;
	}

	.s,
	.v {
		position: absolute;
		--track-background: none;
		--track-border: none;
		--thumb-background: none;
		--thumb-border: none;
		--thumb-size: 2px;
		--margin-block: 0;
		--track-height: var(--picker-indicator-size, 10px);
		user-select: none;
		-webkit-user-select: none;
	}

	.s {
		top: calc(
			var(--pos-y) * (var(--picker-height, 200px) - var(--picker-indicator-size, 10px) - 4px) /
				100 + 2px
		);
		left: 2px;
		--track-width: calc(var(--picker-width, 200px) - 4px);
	}

	.v {
		top: 2px;
		left: calc(
			var(--pos-x) * (var(--picker-width, 200px) - var(--picker-indicator-size, 10px) - 4px) / 100 +
				2px
		);
		--track-width: calc(var(--picker-height, 200px) - 4px);
	}
</style>
