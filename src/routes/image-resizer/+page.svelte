<script lang="ts">
	import EditorScreen from './components/editor-screen.svelte';
	import SelectScreen from './components/select-screen.svelte';
	import { getImageEditor } from '$lib/modules/image-editor.svelte';
	import Seo from '$lib/components/seo.svelte';
	import { Images } from 'lucide-svelte';
	import { PAGES } from '$data/pages';

	const imageEditor = getImageEditor();
	let editorMode = $state(false);
	$effect(() => {
		if (imageEditor.images.length > 0) {
			editorMode = true;
		}
	});
</script>

<Seo
	title="Resize Image Online – Free Image Resizer Tool Without Losing Quality"
	description="Easily resize images online for free with our intuitive image resizer tool. Resize PNGs, photos, and images without losing quality. No sign-ups required."
	keywords="resize image, resize image online, resize photo, image resize, resize picture, resize png, resize images without losing quality, how to resize an image, pic resize, resize image on iPhone"
	canonical={`https://www.tivoku.com${PAGES.IMAGE_RESIZER.link}`}
	themeColor="#D21E48"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Resize Image Online – Free Image Resizer Tool Without Losing Quality',
		description:
			'Easily resize images online for free with our intuitive image resizer tool. Resize PNGs, photos, and images without losing quality. No sign-ups required.',
		url: `https://www.tivoku.com${PAGES.IMAGE_RESIZER.link}`
	}}
/>
<div class="min-h-screen bg-gradient-to-b from-background to-background/80 pb-16">
	<section class="py-12 md:py-16 lg:py-20">
		<div class="container px-4 md:px-6 lg:min-h-[75vh]">
			{#if !editorMode}
				<SelectScreen />
			{:else}
				<EditorScreen />
			{/if}
		</div>
	</section>
</div>
