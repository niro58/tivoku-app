<script lang="ts">
	import EditSection from '$lib/components/edit-section/edit-section.svelte';
	import FileDropper from '$lib/components/file-dropper.svelte';
	import { Button } from '$lib/components/ui/button';
	import { EditableImage } from '$lib/models/image.svelte';
	import { editableImagesStore } from '$lib/stores';
	let isDragging = $state(false);
	let fileDropperRef: HTMLInputElement | null = $state(null);
</script>

{#if $editableImagesStore.length === 0}
	<div class="container flex min-h-screen flex-col items-center justify-center gap-5">
		<div class="text-5xl font-bold uppercase">Simply resize</div>
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
				$editableImagesStore = [...$editableImagesStore, ...editableImages];
			}}
			onclick={() => {
				fileDropperRef?.click();
			}}
		>
			<div
				class={`mx-auto flex aspect-square w-full max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors hover:bg-primary/20 ${
					isDragging ? 'border-primary/90 bg-primary/50' : 'border-primary'
				}`}
			>
				<p class="mb-4 text-center text-white">Drag and Drop Your Files Here</p>
			</div>
		</FileDropper>
	</div>
{:else}
	<EditSection />
{/if}
