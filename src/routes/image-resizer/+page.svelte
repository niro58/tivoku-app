<script lang="ts">
	import EditorScreen from './components/editor-screen.svelte';
	import SelectScreen from './components/select-screen.svelte';
	import { getImageEditor } from '$lib/models/image-editor.svelte';
	import Seo from '$lib/components/seo.svelte';
	import { Check } from 'lucide-svelte';
	import * as Accordion from '$lib/components/ui/accordion/index.js';

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
	canonical="https://www.tivoku.com/image-resizer/"
	themeColor="#D21E48"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Resize Image Online – Free Bulk Image Resizer Without Losing Quality',
		url: 'https://www.tivoku.com/image-resizer/',
		description:
			'Resize images online in bulk for free with our easy-to-use tool. Adjust dimensions, resize photos, PNGs, or any images up to 20 MB without losing quality. No sign-ups required!',
		mainEntity: {
			'@type': 'WebApplication',
			name: 'Bulk Image Resizer Tool',
			url: 'https://www.tivoku.com/image-resizer/',
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
			<section class="mt-16">
				<h2 class="mb-8 text-2xl font-semibold">Why Use Our Bulk Image Resizer?</h2>
				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each ['Process, large images up to 20MB with fast results', 'Work with up to 50 images simultaneously', 'Multiple output formats: PNG, JPG, and WebP', 'Preserve aspect ratio or set custom aspect ratio for resizing', 'High-Quality Results: Resize images without losing quality', 'Free and Accessible: No sign-ups or hidden fees'] as feature}
						<div class="flex items-start gap-3">
							<Check class="mt-1 h-5 w-5 text-rose-500" />
							<span>{feature}</span>
						</div>
					{/each}
				</div>
			</section>
			<section class="mt-16 rounded-lg bg-accent p-8">
				<h2 class="mb-4 text-2xl font-semibold text-accent-foreground">Privacy & Security</h2>
				<p class="text-accent-foreground">
					Your images are processed entirely in your browser. We never store or transmit your files
					to any server. Your privacy is our top priority, ensuring your images remain completely
					secure and private throughout the resizing process.
				</p>
			</section>

			<section class="mt-16">
				<h2 class="mb-8 text-2xl font-semibold">Frequently Asked Questions</h2>
				<Accordion.Root type="single" class="w-full">
					<Accordion.Item value="faq-image-formats">
						<Accordion.Trigger>What image formats are supported?</Accordion.Trigger>
						<Accordion.Content>
							Our image resizer supports PNG, JPG (JPEG), and WebP formats.
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="faq-image-quality">
						<Accordion.Trigger>Will I lose image quality after resizing?</Accordion.Trigger>
						<Accordion.Content>
							No, the quality of the image will stay the same, no compression is applied. However,
							when significantly reducing image size, some quality loss is inevitable due to the
							reduction in total pixels.
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="faq-bulk-resizing">
						<Accordion.Trigger>Can I resize multiple images at once?</Accordion.Trigger>
						<Accordion.Content>
							Yes, our app supports bulk resizing, allowing you to process multiple images or an
							entire folder simultaneously.
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="faq-max-file-size">
						<Accordion.Trigger
							>What is the maximum file size for uploading and number of simultaneous uploads?</Accordion.Trigger
						>
						<Accordion.Content>
							You can upload individual images up to 20 MB each and edit 50 images at the same time.
							This ensures compatibility with high-resolution photos and professional-quality files.
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			</section>
		</div>
	</section>
</div>
