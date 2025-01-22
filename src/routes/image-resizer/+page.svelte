<script lang="ts">
	import EditorScreen from './components/editor-screen.svelte';
	import SelectScreen from './components/select-screen.svelte';
	import { getImageEditor } from '$lib/models/image-editor.svelte';
	import Seo from '$lib/components/seo.svelte';
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
	title="Free Bulk Image Resizer Without Losing Quality"
	description="Resize images online in bulk for free with our user-friendly tool. Adjust dimensions and maintain quality for photos, PNGs, and more, up to 20 MB."
	keywords="resize image, resize image online, bulk resize images, resize photo, image resize, resize picture, resize PNG, resize images without losing quality, how to resize an image, resize images in bulk, resize image on iPhone"
	canonical="https://www.tivoku.com/resize-image/"
	themeColor="#D21E48"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Resize Image Online – Free Bulk Image Resizer Without Losing Quality',
		url: 'https://www.tivoku.com/resize-image/',
		description:
			'Resize images online in bulk for free with our easy-to-use tool. Adjust dimensions, resize photos, PNGs, or any images up to 20 MB without losing quality. No sign-ups required!',
		mainEntity: {
			'@type': 'WebApplication',
			name: 'Bulk Image Resizer Tool',
			url: 'https://www.tivoku.com/resize-image/',
			description:
				'Free online bulk image resizer tool to resize photos, PNGs, and other images up to 20 MB. Resize images without losing quality quickly and easily.',
			applicationCategory: 'MultimediaTool',
			operatingSystem: 'All',
			offers: {
				'@type': 'Offer',
				price: '0',
				priceCurrency: 'USD',
				category: 'Free Tool'
			},
			author: {
				'@type': 'Person',
				name: 'Niro58'
			},
			publisher: {
				'@type': 'Organization',
				name: 'Tivoku',
				logo: {
					'@type': 'ImageObject',
					url: 'https://www.tivoku.com/logo.png',
					width: 500,
					height: 281
				}
			}
		},
		'@graph': [
			{
				'@type': 'FAQPage',
				mainEntity: [
					{
						'@type': 'Question',
						name: 'What image formats are supported?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'Our image resizer supports PNG, JPG (JPEG), and WebP formats.'
						}
					},
					{
						'@type': 'Question',
						name: 'Will I lose image quality after resizing?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'No, the quality of the image will stay the same, no compression is applied. However, when significantly reducing image size, some quality loss is inevitable due to the reduction in total pixels.'
						}
					},

					{
						'@type': 'Question',
						name: 'Can I resize multiple images at once?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'Yes, our app supports bulk resizing, allowing you to process multiple images or an entire folder simultaneously.'
						}
					},
					{
						'@type': 'Question',
						name: 'What is the maximum file size for uploading and number of simultaneous uploads?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'You can upload individual images up to 20 MB each and edit 50 images at the same time.'
						}
					}
				]
			}
		]
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
