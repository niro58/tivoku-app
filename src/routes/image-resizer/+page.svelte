<script module>
	const faqs = [
		{
			question: 'What image formats are supported?',
			answer: 'We support PNG, JPG (JPEG), and WebP formats for resizing.',
			key: 'image-formats'
		},
		{
			question: 'Will I lose image quality after resizing?',
			answer:
				'No, the quality remains the same—no compression is applied. However, significantly reducing image size may result in minor quality loss due to fewer pixels.',
			key: 'image-quality'
		},
		{
			question: 'Can I resize multiple images at once?',
			answer:
				'Yes! You can resize up to 100 images at once, making it perfect for bulk processing.',
			key: 'multiple-images'
		},
		{
			question: 'What is the maximum file size for uploading and number of simultaneous uploads?',
			answer: 'You can upload images up to 25 MB each and resize up to 100 images simultaneously.',
			key: 'file-size'
		}
	];
</script>

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
	title="Free Bulk Image Resizer Online – Resize Images Without Losing Quality"
	description="Resize images online in bulk for free with our fast and secure tool. Adjust dimensions, maintain quality, and process up to 100 images at once—no sign-ups required!"
	keywords="resize image online, bulk image resizer, resize images without losing quality, free image resizer, resize PNG, resize JPG, resize WebP, bulk image editor, fast image resizer, secure image resizer"
	canonical="https://www.tivoku.com/image-resizer/"
	themeColor="#D21E48"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Resize Image Online – Free Bulk Image Resizer Without Losing Quality',
		url: 'https://www.tivoku.com/image-resizer/',
		description:
			'Resize images online in bulk for free with our fast and secure tool. Adjust dimensions, maintain quality, and process up to 100 images at once—no sign-ups required!',
		mainEntity: {
			'@type': 'WebApplication',
			name: 'Bulk Image Resizer Tool',
			url: 'https://www.tivoku.com/image-resizer/',
			description:
				'Free online bulk image resizer tool to resize photos, PNGs, and other images up to 25 MB. Resize images without losing quality quickly and easily.',
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
							text: 'We support PNG, JPG (JPEG), and WebP formats for resizing.'
						}
					},
					{
						'@type': 'Question',
						name: 'Will I lose image quality after resizing?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'No, the quality remains the same—no compression is applied. However, significantly reducing image size may result in minor quality loss due to fewer pixels.'
						}
					},
					{
						'@type': 'Question',
						name: 'Can I resize multiple images at once?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'Yes! You can resize up to 100 images at once, making it perfect for bulk processing.'
						}
					},
					{
						'@type': 'Question',
						name: 'What is the maximum file size for uploading and number of simultaneous uploads?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'You can upload images up to 25 MB each and resize up to 100 images simultaneously.'
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
					{#each ['Resize large images up to 20MB with lightning-fast results', 'Bulk resize up to 100 images at once', 'Supports multiple formats: PNG, JPG, and WebP', 'Preserve or customize aspect ratios for perfect resizing', 'Resize images without losing quality—high-quality results guaranteed', '100% free—no sign-ups, no hidden fees'] as feature}
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
					Your images are processed entirely in your browser—no data is ever sent to our servers. We
					prioritize your privacy, ensuring your files remain secure and private throughout the
					resizing process.
				</p>
			</section>

			<section class="relative py-16 md:py-24 lg:pb-32 lg:pt-16" id="faq">
				<div class="container px-4 md:px-6">
					<h2 class="mb-12 text-center text-3xl font-bold text-primary md:text-4xl">
						Frequently Asked Questions
					</h2>
					<Accordion.Root type="single" class="mx-auto max-w-3xl space-y-4">
						{#each faqs as { question, answer, key }}
							<Accordion.Item
								value={key}
								class="group rounded-xl border border-foreground/10 bg-background/20 transition-all hover:border-primary/20"
							>
								<Accordion.Trigger class="flex items-center justify-between p-6 text-lg font-medium"
									>{question}</Accordion.Trigger
								>
								<Accordion.Content class="px-6 text-sm leading-relaxed text-muted-foreground">
									{answer}
								</Accordion.Content>
							</Accordion.Item>
						{/each}
					</Accordion.Root>
				</div>
			</section>
		</div>
	</section>
</div>
