<script lang="ts">
	import FileDropper from '$lib/components/file-dropper.svelte';
	import Seo from '$lib/components/seo.svelte';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { EditableImage } from '$lib/models/image.svelte';
	import { getImageEditor } from '$lib/modules/image-editor.svelte';
	import { ArrowRight, Check, ImageIcon, Upload } from 'lucide-svelte';
	let fileDropperRef: HTMLInputElement | null = $state(null);

	const imageEditor = getImageEditor();
</script>

<Seo
	title="Resize Image Online – Free Bulk Image Resizer Without Losing Quality"
	description="Resize images online in bulk for free with our easy-to-use tool. Adjust dimensions, resize photos, PNGs, or any images up to 20 MB without losing quality. No sign-ups required!"
	keywords="resize image, resize image online, bulk resize images, resize photo, image resize, resize picture, resize PNG, resize images without losing quality, how to resize an image, resize images in bulk, resize image on iPhone"
	canonical="https://www.tivoku.com/resize-image"
	themeColor="#D21E48"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Resize Image Online – Free Bulk Image Resizer Without Losing Quality',
		url: 'https://www.tivoku.com/resize-image',
		description:
			'Resize images online in bulk for free with our easy-to-use tool. Adjust dimensions, resize photos, PNGs, or any images up to 20 MB without losing quality. No sign-ups required!',
		mainEntity: {
			'@type': 'WebApplication',
			name: 'Bulk Image Resizer Tool',
			url: 'https://www.tivoku.com/resize-image',
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

<section class="mb-8 flex flex-col items-center space-y-4 text-center">
	<div class="space-y-2">
		<h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
			Free Online Bulk Image Resizer – Resize Images Without Losing Quality
		</h1>
		<p class="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
			Resize images online in bulk with our free image resizer tool. Whether you’re resizing a
			single PNG, JPG, or an entire folder of photos, our app ensures that your images remain sharp
			and maintain their quality. Perfect for social media, websites, or personal projects, our bulk
			resizing tool is fast, efficient, and hassle-free.
		</p>
	</div>
</section>

<section class="grid min-h-[50vh] gap-8 md:grid-cols-2 lg:gap-12">
	<Card.Root class="grid grid-cols-1 grid-rows-1 border-2 border-dashed border-muted">
		<Card.Content class="p-6">
			<FileDropper
				class="rounded-lg border-2 border-dashed border-muted-foreground/25 transition-colors hover:border-primary/50 hover:bg-primary/10"
				bind:fileInputRef={fileDropperRef}
				accept="image/*"
				startsWith="image/"
				maxSize={50 * 1024 * 1024}
				onfileaccept={(files) => {
					const editableImages = Array.from(files).map((file) => new EditableImage(file));
					imageEditor.images = [...imageEditor.images, ...editableImages];
				}}
				onclick={() => {
					fileDropperRef?.click();
				}}
			>
				<div class="flex h-full flex-col items-center justify-center space-y-4 p-8">
					<div class="rounded-full bg-primary/10 p-4">
						<Upload class="h-8 w-8 text-primary" />
					</div>
					<div class="space-y-2 text-center">
						<h3 class="text-lg font-semibold">Drag and drop your image here</h3>
						<p class="text-sm text-muted-foreground">
							Supports PNG, JPG, and WebP formats up to 20MB
						</p>
					</div>
				</div>
			</FileDropper>
		</Card.Content>
	</Card.Root>

	<div class="space-y-8">
		<div class="space-y-4">
			<h2 class="text-2xl font-bold">How to Resize an Image</h2>
			<div class="grid gap-4">
				<div class="flex items-start space-x-4">
					<div class="rounded-full bg-primary/10 p-2">
						<Upload class="h-4 w-4 text-primary" />
					</div>
					<div>
						<h3 class="font-semibold">1. Upload Your Image:</h3>
						<p class="text-sm text-muted-foreground">
							Drag and drop your image or select it from your device.
						</p>
					</div>
				</div>
				<div class="flex items-start space-x-4">
					<div class="rounded-full bg-primary/10 p-2">
						<ImageIcon class="h-4 w-4 text-primary" />
					</div>
					<div>
						<h3 class="font-semibold">2. Set New Dimensions:</h3>
						<p class="text-sm text-muted-foreground">
							Enter the desired width and height for your image.
						</p>
					</div>
				</div>
				<div class="flex items-start space-x-4">
					<div class="rounded-full bg-primary/10 p-2">
						<ArrowRight class="h-4 w-4 text-primary" />
					</div>
					<div>
						<h3 class="font-semibold">3. Resize and Download:</h3>
						<p class="text-sm text-muted-foreground">
							Click the "Resize" button and download your resized image instantly.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
<section class="mt-16">
	<h2 class="mb-8 text-2xl font-semibold">Why Use Our Bulk Image Resizer?</h2>
	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each ['Save time by resizing multiple images in one go—ideal for batch processing.', 'Resize multiple images simultaneously without any sign-ups, fees, or hidden costs.', 'Multiple output formats: PNG, JPG, and WebP', 'Preserve aspect ratio or set custom dimensions for resizing', 'High-Quality Results: Resize images without losing quality', 'Free and Accessible: No sign-ups or hidden fees', 'Process large images up to 20MB with fast results'] as feature}
			<div class="flex items-start gap-3">
				<Check class="mt-1 h-5 w-5 text-rose-500" />
				<span class="text-zinc-400">{feature}</span>
			</div>
		{/each}
	</div>
</section>
<section class="mt-16 rounded-lg bg-[#231F1E] p-8">
	<h2 class="mb-4 text-2xl font-semibold">Privacy & Security</h2>
	<p class="text-zinc-400">
		Your images are processed entirely in your browser. We never store or transmit your files to any
		server. Your privacy is our top priority, ensuring your images remain completely secure and
		private throughout the resizing process.
	</p>
</section>

<section class="mt-16">
	<h2 class="mb-8 text-2xl font-semibold">Frequently Asked Questions</h2>
	<Accordion.Root type="single" class="w-full">
		<Accordion.Item value="item-1">
			<Accordion.Trigger>What image formats are supported?</Accordion.Trigger>
			<Accordion.Content>
				Our image resizer supports PNG, JPG (JPEG), and WebP formats.
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-2">
			<Accordion.Trigger>Will I lose image quality after resizing?</Accordion.Trigger>
			<Accordion.Content>
				No, the quality of the image will stay the same, no compression is applied. However, when
				significantly reducing image size, some quality loss is inevitable due to the reduction in
				total pixels.
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-3">
			<Accordion.Trigger>Can I resize multiple images at once?</Accordion.Trigger>
			<Accordion.Content>
				Yes, our app supports bulk resizing, allowing you to process multiple images or an entire
				folder simultaneously.
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-3">
			<Accordion.Trigger
				>What is the maximum file size for uploading and number of simultaneous uploads?</Accordion.Trigger
			>
			<Accordion.Content>
				You can upload individual images up to 20 MB each and edit 50 images at the same time. This
				ensures compatibility with high-resolution photos and professional-quality files.
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
</section>
