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
				'No, the quality stays the same—no compression is applied. However, reducing size significantly may cause minor quality loss due to fewer pixels.',
			key: 'image-quality'
		},
		{
			question: 'Can I resize multiple images at once?',
			answer: 'Yes! You can resize up to 100 images at once—perfect for bulk processing.',
			key: 'multiple-images'
		},
		{
			question: 'What is the maximum file size and number of images I can resize?',
			answer:
				'You can upload images up to 25 MB each and resize up to 100 images at the same time.',
			key: 'file-size'
		},
		{
			question: 'Is my data safe?',
			answer:
				'Yes! All processing happens in your browser—no data is ever uploaded to our servers.',
			key: 'data-safety'
		}
	];
	const features = [
		{
			title: 'Resize up to 100 images at once',
			icon: Image
		},
		{
			title: 'Supports PNG, JPG, and WebP formats',
			icon: Image
		},
		{
			title: 'Preserve or customize aspect ratios',
			icon: Image
		},
		{
			title: 'No quality loss—high-quality results',
			icon: Image
		},
		{
			title: '100% free—no sign-ups, no hidden fees',
			icon: Lock
		},
		{
			title: 'Process images up to 25 MB each',
			icon: Image
		}
	];
</script>

<script lang="ts">
	import EditorScreen from './components/editor-screen.svelte';
	import SelectScreen from './components/select-screen.svelte';
	import { getImageEditor } from '$lib/models/image-editor.svelte';
	import Seo from '$lib/components/seo.svelte';
	import { Check, Image, Lock } from 'lucide-svelte';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import CircleDesignElement from '$lib/components/circle-design-element.svelte';

	const imageEditor = getImageEditor();
	let editorMode = $state(false);
	$effect(() => {
		if (imageEditor.images.length > 0) {
			editorMode = true;
		}
	});
</script>

<Seo
	title="Bulk Image Resizer – Tivoku"
	description="Resize 100+ images in bulk for free—fast, secure, and entirely in your browser. No sign-ups, no uploads. Start resizing now!"
	keywords="resize images in browser, bulk image resizer, free image resizer, resize PNG, resize JPG, resize WebP, fast image resizer, secure image resizer, no upload image resizer"
	canonical="https://www.tivoku.com/image-resizer"
	themeColor="#D21E48"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Bulk Image Resizer – Tivoku',
		url: 'https://www.tivoku.com/image-resizer',
		description:
			'Resize 100+ images in bulk for free—fast, secure, and entirely in your browser. No sign-ups, no uploads. Start resizing now!',
		mainEntity: {
			'@type': 'WebApplication',
			name: 'Bulk Image Resizer Tool',
			url: 'https://www.tivoku.com/image-resizer',
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
							text: 'No, the quality stays the same—no compression is applied. However, reducing size significantly may cause minor quality loss due to fewer pixels.'
						}
					},
					{
						'@type': 'Question',
						name: 'Can I resize multiple images at once?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'Yes! You can resize up to 100 images at once—perfect for bulk processing.'
						}
					},
					{
						'@type': 'Question',
						name: 'What is the maximum file size and number of images I can resize?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'You can upload images up to 25 MB each and resize up to 100 images at the same time.'
						}
					},
					{
						'@type': 'Question',
						name: 'Is my data safe?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'Yes! All processing happens in your browser—no data is ever uploaded to our servers.'
						}
					}
				]
			}
		]
	}}
/>
<div
	class="container relative mx-auto bg-gradient-to-b from-background to-background/80 px-4 py-12 pb-16"
>
	<CircleDesignElement variation="1" />
	<CircleDesignElement variation="2" />
	<CircleDesignElement variation="3" />

	<section class="min-h-screen">
		{#if !editorMode}
			<SelectScreen />
		{:else}
			<EditorScreen />
		{/if}
	</section>
	<section class="relative py-16">
		<div class="relative mx-auto">
			<div class="mx-auto max-w-6xl">
				<div class="grid gap-12 md:grid-cols-2">
					<div class="space-y-8">
						<h2 class="text-3xl font-bold text-foreground md:text-4xl">
							Resize Images Fast & Securely—No Uploads, No Hassle
						</h2>

						<p class="text-lg leading-relaxed text-gray-400">
							Our bulk image resizer works entirely in your browser, so your files never leave your
							device. Resize up to 100 images at once, with no sign-ups or hidden fees. It’s fast,
							simple, and secure.
						</p>
					</div>

					<div class="grid gap-6">
						{#each [{ title: 'Resize in Your Browser', description: 'All processing happens locally—no uploads, no waiting.', icon: Lock }, { title: 'Bulk Resize Up to 100 Images', description: 'Save time by resizing multiple images at once.', icon: Image }, { title: 'No Quality Loss', description: 'Resize images without losing clarity or sharpness.', icon: Image }] as feature}
							<div
								class="flex gap-6 rounded-xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm"
							>
								<div class="h-12 rounded-lg bg-primary/10 p-3 text-primary">
									<feature.icon class="h-6 w-6" />
								</div>
								<div>
									<h3 class="mb-2 font-semibold text-foreground">{feature.title}</h3>
									<p class="text-sm text-gray-400">{feature.description}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="relative py-16">
		<div class="relative mx-auto">
			<div class="mx-auto max-w-4xl">
				<h2 class="mb-12 text-center text-3xl font-bold md:text-4xl">
					Why Choose Our Image Resizer?
				</h2>

				<div class="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each features as feature}
						<div
							class="flex items-start gap-4 rounded-xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm"
						>
							<div class="rounded-lg bg-primary/10 p-2 text-primary">
								<Check class="h-5 w-5" />
							</div>
							<div>
								<h3 class="font-medium">{feature.title}</h3>
							</div>
						</div>
					{/each}
				</div>
				<div
					class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary p-8 md:p-12"
				>
					<div
						class="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:5rem_5rem] opacity-10"
					></div>

					<div
						class="relative flex flex-col items-center gap-6 text-center md:flex-row md:text-left"
					>
						<div class="rounded-full bg-foreground/10 p-4">
							<Lock class="h-8 w-8" />
						</div>
						<div>
							<h3 class="mb-2 text-xl font-semibold md:text-2xl">Your Privacy Matters</h3>
							<p class="text-foreground/90">
								All image processing happens in your browser—no uploads, no servers, no risk. Your
								files stay private and secure.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="relative py-16 md:py-24 lg:pb-32 lg:pt-16" id="faq">
		<div class="container px-4 md:px-6">
			<h2 class="mb-12 text-center text-3xl font-bold text-primary md:text-4xl">
				Frequently Asked Questions
			</h2>
			<Accordion.Root type="single" class="mx-auto max-w-3xl space-y-4">
				{#each faqs as { question, answer, key }}
					<Accordion.Item value={key}>
						<Accordion.Trigger>{question}</Accordion.Trigger>
						<Accordion.Content>
							{answer}
						</Accordion.Content>
					</Accordion.Item>
				{/each}
			</Accordion.Root>
		</div>
	</section>
</div>
