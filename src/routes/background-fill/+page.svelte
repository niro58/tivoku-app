<script lang="ts">
	import FileDropper from '$lib/components/file-dropper.svelte';
	import { Button } from '$lib/components/ui/button';
	import { EditableImage } from '$lib/models/image.svelte';
	import { type ImageSettings, type ImageExportFormats } from '$lib/models/imageSettings';
	import { cn } from '$lib/utils';
	import ImageEditor from './components/image-editor.svelte';
	let isDragging = $state(false);
	let fileDropperRef: HTMLInputElement | null = $state(null);
	let images: EditableImage[] = $state([]);
	let settings: ImageSettings = $state({
		aspectRatio: {
			x: 1,
			y: 1
		},
		backgroundColor: '#000000',
		format: 'png' as ImageExportFormats,
		opacity: 1
	});
</script>

<div class="container flex min-h-screen flex-col items-center justify-center gap-5">
	<div class="text-5xl font-bold uppercase">Simply resize</div>
	<div class="flex flex-row gap-5">
		{#each images as image (image.id)}
			<button
				class="flex aspect-square h-32 w-32 items-center justify-center rounded-xl border-2 p-1"
			>
				<img src={image.src} alt={image.alt} class="h-full object-contain" />
			</button>
		{/each}
		<FileDropper
			bind:ref={fileDropperRef}
			accept="image/*"
			ondragenter={() => {
				isDragging = true;
			}}
			ondragleave={() => {
				isDragging = false;
			}}
			onfileaccept={(files) => {
				const editableImages = Array.from(files).map((file) => new EditableImage(file));
				images = [...images, ...editableImages];
			}}
			onclick={() => {
				fileDropperRef?.click();
			}}
		>
			<div
				class={cn(
					'mx-auto flex aspect-square w-full max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors hover:bg-primary/20',
					isDragging ? 'border-primary/90 bg-primary/50' : 'border-primary',
					images.length === 0 ? 'h-96' : 'h-32'
				)}
			>
				<p class="mb-4 text-center text-white">Drag and Drop Your Files Here</p>
			</div>
		</FileDropper>
	</div>
	<ImageEditor bind:settings />
	<Button
		onclick={() => {
			images.forEach((image) => {
				image.export(settings);
			});
		}}
	>
		<span>Download</span>
	</Button>
</div>
