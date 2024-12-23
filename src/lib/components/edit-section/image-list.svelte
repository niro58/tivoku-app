<script lang="ts">
	import { EditableImage } from '$lib/models/image.svelte';
	import FileDropper from '../file-dropper.svelte';

	import { Button } from '../ui/button';
	import { X } from 'lucide-svelte';
	let fileDropperRef: HTMLInputElement | null = $state(null);
	function onFileAccept(files: FileList) {
		const editableImages = Array.from(files).map((file) => new EditableImage(file));
		$editableImagesStore = [...$editableImagesStore, ...editableImages];
	}
</script>

<div class="p-5">
	<h2 class="mb-4 font-bold">Selected Images</h2>
	<div class="space-y-2">
		{#each $editableImagesStore as image, index (image.id)}
			<div
				class={`flex h-16 items-center rounded p-2 ${
					image.id === $selectedImageStore.id ? 'bg-primary' : 'hover:bg-primary/20'
				}`}
			>
				<button
					class="flex flex-grow items-center justify-between"
					onclick={() => {
						selectedImageStore.set(image);
					}}
				>
					<div class="flex items-center">
						<div class="relative mr-2 h-12 w-12 flex-shrink-0">
							<img src={image.src} alt={image.alt} class="h-full w-full rounded object-cover" />
						</div>
					</div>
				</button>
				<Button
					variant="ghost"
					size="sm"
					class="ml-2"
					onclick={() => {
						$editableImagesStore = $editableImagesStore.filter((_, i) => i !== index);
					}}
				>
					<X class="h-4 w-4" />
				</Button>
			</div>
		{/each}
	</div>
	<Button
		variant="default"
		class="mt-8 w-full"
		onclick={() => {
			console.log(fileDropperRef);
			fileDropperRef?.click();
		}}>Upload Images</Button
	>
	<input
		type="file"
		accept="image/*"
		class="hidden"
		bind:this={fileDropperRef}
		multiple
		onchange={(e) => {
			const target = e.target;
			if (target instanceof HTMLInputElement && target.files) {
				const files = target.files;
				onFileAccept(files);
			}
		}}
	/>
</div>
