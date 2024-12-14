<script lang="ts">
	import type { EditableImage } from '$lib/models/image.svelte';
	import { cropStore, editableImagesStore, selectedImageStore } from '$lib/stores';

	let image: EditableImage | undefined = $state();
	$effect(() => {
		image = $editableImagesStore.find((image) => image.id === $selectedImageStore.id);
	});
</script>

{#if image}
	<div class="relative flex h-full w-full overflow-hidden bg-black">
		<img
			src={image.src}
			alt={image.alt}
			class="mx-auto object-contain transition-all duration-300 ease-in-out"
			style={`transform:scale(${$cropStore.zoom / 100})`}
		/>
	</div>
{/if}
