<script lang="ts">
	import { EditableImage } from '$lib/models/image.svelte';
	import { editableImagesStore, selectedImageStore } from '$lib/stores';

	import { Button } from '../ui/button';
	import { X } from 'lucide-svelte';
</script>

<h2 class="mb-4 font-bold">Selected Images</h2>
<div class="space-y-2">
	{#each $editableImagesStore as image, index (image.id)}
		<div
			class={`flex h-16 items-center rounded p-2 ${
				image.id === $selectedImageStore.id ? 'bg-blue-400/50' : 'hover:bg-blue-400/90'
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
					<span class="truncate text-sm">{image.alt}</span>
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
<input
	type="file"
	accept={'image/*'}
	onchange={(e) => {
		const target = e.target;
		if (target instanceof HTMLInputElement && target.files) {
			const files = target.files;
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				$editableImagesStore = [...$editableImagesStore, new EditableImage(file)];
			}
		}
	}}
	multiple
/>
