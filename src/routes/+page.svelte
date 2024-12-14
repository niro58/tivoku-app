<script lang="ts">
	import EditSection from '$lib/components/edit-section/edit-section.svelte';
	import { EditableImage } from '$lib/models/image.svelte';
	import { editableImagesStore } from '$lib/stores';
</script>

{#if $editableImagesStore.length === 0}
	<div class="container flex min-h-screen flex-col items-center justify-center gap-5">
		<div class="text-5xl font-bold uppercase">Simply resize</div>
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
	</div>
{:else}
	<EditSection />
{/if}
