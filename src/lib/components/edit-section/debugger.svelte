<script lang="ts">
	import { cropStore, editableImagesStore, selectedImageStore } from '$lib/stores';
</script>

<div class="absolute bottom-0 left-0 flex flex-row gap-5 bg-black p-5">
	<div>
		{#each $editableImagesStore as img}
			<div>
				{img.alt} | {img.id}
			</div>
		{/each}
	</div>
	{#if $editableImagesStore.length > 0}
		<div class="flex flex-col space-x-2">
			<div>Current image store</div>
			<div>Width: {$selectedImageStore.width}</div>
			<div>Height: {$selectedImageStore.height}</div>
		</div>
	{/if}
	<!--Crop store-->
	<div>
		<div>Crop store</div>
		<div>Width: {$cropStore.width}</div>
		<div>Height: {$cropStore.height}</div>
		<div>X: {$cropStore.x}</div>
		<div>Y: {$cropStore.y}</div>
	</div>
	<div>
		<div>Selected image index</div>
		<div>{$editableImagesStore.findIndex((img) => img.id === $selectedImageStore.id)}</div>
	</div>
</div>
