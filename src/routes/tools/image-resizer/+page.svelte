<script lang="ts">
	import EditorScreen from './components/editor-screen.svelte';
	import SelectScreen from './components/select-screen.svelte';
	import { getImageEditor } from '$lib/modules/image-editor.svelte';
	import Seo from '$lib/components/seo.svelte';

	const imageEditor = getImageEditor();
</script>

<Seo
	title="Online Image Resizer & Background Filler - Resize Images Free | Tivoku"
	description="Resize your images and fill backgrounds easily with our free online tool. No sign-ups, supports PNG, JPG, WebP, and up to 10MB. Instant download!"
	keywords="online image resizer, background filler tool, resize images online, free image editing tools, no sign-up image resizer, resize JPG, resize PNG, resize WebP"
	canonical="https://tivoku.com/tools/image-resizer"
	themeColor="#D21E48"
/>
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
