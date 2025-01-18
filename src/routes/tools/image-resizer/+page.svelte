<script lang="ts">
	import EditorScreen from './components/editor-screen.svelte';
	import SelectScreen from './components/select-screen.svelte';
	import { getImageEditor } from '$lib/modules/image-editor.svelte';
	import Seo from '$lib/components/seo.svelte';

	const imageEditor = getImageEditor();
</script>

<Seo title="Image Resizer" />
<div class="min-h-screen bg-gradient-to-b from-background to-background/80 pb-16">
	<section class="py-12 md:py-16 lg:py-20">
		<div class="container h-[75vh] px-4 md:px-6">
			{#if imageEditor.images.length === 0}
				<SelectScreen />
			{:else}
				<EditorScreen />
			{/if}
		</div>
	</section>
</div>
