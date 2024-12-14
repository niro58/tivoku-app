<script lang="ts" module>
	const aspectRatios = [
		{ label: '1:1', value: '1:1' },
		{ label: '4:3', value: '4:3' },
		{ label: '16:9', value: '16:9' }
	];

	const zoomLevels = [
		{ label: '50%', value: 50 },
		{ label: '100%', value: 100 },
		{ label: '150%', value: 150 },
		{ label: '200%', value: 200 }
	];
</script>

<script lang="ts">
	import type { EditableImage } from '$lib/models/image.svelte';
	import { cropStore, editableImagesStore, selectedImageStore } from '$lib/stores';
	import Button from '../ui/button/button.svelte';
	import { Checkbox } from '../ui/checkbox';

	import { Input } from '../ui/input';

	import { Label } from '../ui/label';
	import * as Select from '../ui/select';

	let image: EditableImage | undefined = $state();
	$effect(() => {
		image = $editableImagesStore.find((image) => image.id === $selectedImageStore.id);
	});
</script>

{#if image}
	<div>
		<Label for="aspect-ratio">Aspect Ratio</Label>
		<Select.Root
			type="single"
			onValueChange={(value) => {
				const [ratioX, ratioY] = value.split(':').map(Number);
				$cropStore.width = $selectedImageStore.width / ratioX;
				$cropStore.height = $selectedImageStore.height / ratioY;
			}}
		>
			<Select.Trigger id="aspect-ratio">Select aspect ratio</Select.Trigger>
			<Select.Content>
				{#each aspectRatios as ratio}
					<Select.Item value={ratio.value}>
						{ratio.label}
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>

	<div class="flex space-x-2">
		<div>
			<Label for="width">Width</Label>
			<Input id="width" type="number" value={$cropStore.width} />
		</div>
		<div>
			<Label for="height">Height</Label>
			<Input id="height" type="number" value={$cropStore.width} />
		</div>
	</div>

	<div>
		<Label for="zoom">Zoom</Label>
		<Select.Root
			type="single"
			onValueChange={(value) => {
				$cropStore.zoom = Number(value);
			}}
		>
			<Select.Trigger id="zoom">Select zoom level</Select.Trigger>
			<Select.Content>
				{#each zoomLevels as level}
					<Select.Item value={level.value.toString()}>
						{level.label}
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>

	<div class="pt-4">
		<Checkbox id="remove-original" />
		<Label for="remove-original">Remove original image</Label>
	</div>
	<div>
		<Button class="w-full">Download</Button>
	</div>
{/if}
