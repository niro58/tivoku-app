<script module lang="ts">
	const aspectRatios: {
		dir: Vector2;
		title: string;
	}[] = [
		{ dir: { x: 1, y: 1 }, title: '1 : 1 - Square' },
		{ dir: { x: 16, y: 9 }, title: '16 : 9 - Best for XY' },
		{ dir: { x: 4, y: 3 }, title: '4 : 3 - Best for XY' }
	];
	const colorPrefabs = ['#000000', '#ffffff', '#ff0000'];
</script>

<script lang="ts">
	import ColorInput from '$lib/components/ui/color-input.svelte';

	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import {
		aspectRatioToKey,
		type ImageExportFormats,
		type ImageSettings,
		type Vector2
	} from '$lib/models/imageSettings';

	let {
		settings = $bindable()
	}: {
		settings: ImageSettings;
	} = $props();

	let colorRef: HTMLInputElement | null = $state(null);
</script>

<div class="grid grid-cols-2 gap-2">
	<div class="flex flex-col space-y-2">
		<Label for="format">Format</Label>
		<Select.Root
			type="single"
			value={settings.format}
			onValueChange={(e) => (settings.format = e as ImageExportFormats)}
		>
			<Select.Trigger id="format" class="w-[180px]">
				{settings.format.toString().toUpperCase()}
			</Select.Trigger>
			<Select.Content>
				{#each ['png', 'jpeg', 'webp'] as format}
					<Select.Item value={format}>{format.toUpperCase()}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>

	<div class="flex flex-col space-y-2">
		<Label for="aspect-ratio">Aspect Ratio</Label>
		<Select.Root
			type="single"
			value={aspectRatioToKey(settings.aspectRatio)}
			onValueChange={(e) => {
				const [x, y] = e.split(':');
				settings.aspectRatio = { x: parseInt(x), y: parseInt(y) };
			}}
		>
			<Select.Trigger class="w-[180px]" id="aspect-ratio">
				{`${settings.aspectRatio.x} : ${settings.aspectRatio.y}`}
			</Select.Trigger>
			<Select.Content>
				{#each aspectRatios as ar}
					<Select.Item value={aspectRatioToKey(ar.dir)}>{ar.title}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>
	<div class="flex flex-col space-y-2">
		<Label for="aspect-ratio">Background Color</Label>
		<ColorInput bind:backgroundColor={settings.backgroundColor} bind:opacity={settings.opacity} />
		<div class="flex flex-row gap-1">
			<button
				aria-label="Transparent"
				class="h-6 w-6 rounded-lg border border-white/40 bg-white"
				onclick={() => (settings.opacity = 0)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="100%"
					height="100%"
					viewBox="0 0 15 15"
					fill="none"
				>
					<path
						opacity=".25"
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M0 0H3V3H0V0ZM6 3H3V6H0V9H3V12H0V15H3V12H6V15H9V12H12V15H15V12H12V9H15V6H12V3H15V0H12V3H9V0H6V3ZM6 6V3H9V6H6ZM6 9H3V6H6V9ZM9 9V6H12V9H9ZM9 9H6V12H9V9Z"
						fill="#000000"
					/>
				</svg>
			</button>
			{#each colorPrefabs as color}
				<button
					aria-label="Color"
					class="h-6 w-6 rounded-lg border border-white/40"
					style:background-color={color}
					onclick={() => {
						settings.backgroundColor = color;
						settings.opacity = 1;
					}}
				></button>
			{/each}
		</div>
	</div>
	<div class="flex flex-col space-y-2">
		<Label for="aspect-ratio">X</Label>
		<Input bind:value={settings.aspectRatio.x} type="text" />
		<Label for="aspect-ratio">Y</Label>
		<Input bind:value={settings.aspectRatio.y} type="text" />
	</div>
</div>
