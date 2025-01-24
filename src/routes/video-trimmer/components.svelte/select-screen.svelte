<script lang="ts">
	import { CONSTANTS } from '$data/constants';
	import FileDropper from '$lib/components/file-dropper.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';

	import { ArrowRight, Check, ImageIcon, Upload } from 'lucide-svelte';
	import type { VideoEditor } from '$lib/models/video-editor.svelte';
	let { videoEditor = $bindable(), changeMode }: { videoEditor: VideoEditor; changeMode: () => void } = $props();
	let fileDropperRef: HTMLInputElement | null = $state(null);
</script>

<div class="container">
	<section class="mb-8 flex flex-col items-center space-y-4 text-center">
		<div class="space-y-2">
			<h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
				Free Online Bulk Image Resizer – Resize Images Without Losing Quality
			</h1>
			<p class="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
				Resize images online in bulk with our free image resizer tool. Whether you’re resizing a
				single PNG, JPG, or an entire folder of photos, our app ensures that your images remain
				sharp and maintain their quality. Perfect for social media, websites, or personal projects,
				our bulk resizing tool is fast, efficient, and hassle-free.
			</p>
		</div>
	</section>

	<section class="grid min-h-[50vh] gap-8 md:grid-cols-2 lg:gap-12">
		<Card.Root class="grid grid-cols-1 grid-rows-1 border-2 border-dashed border-muted">
			<Card.Content class="p-6">
				<FileDropper
					class="rounded-lg border-2 border-dashed border-muted-foreground/25 transition-colors hover:border-primary/50 hover:bg-primary/10"
					bind:fileInputRef={fileDropperRef}
					accept="video/mp4,video/x-m4v,video/*"
					startsWith="video/"
					maxSize={CONSTANTS.MAX_IMAGE_SIZE}
					onfileaccept={(files) => {
						if (files.length > 0) {
							changeMode();
							videoEditor.load(files[0]);
						}
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
								Resize the images using available options and download the resized images.
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
			Your images are processed entirely in your browser. We never store or transmit your files to
			any server. Your privacy is our top priority, ensuring your images remain completely secure
			and private throughout the resizing process.
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
					No, the quality of the image will stay the same, no compression is applied. However, when
					significantly reducing image size, some quality loss is inevitable due to the reduction in
					total pixels.
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="faq-bulk-resizing">
				<Accordion.Trigger>Can I resize multiple images at once?</Accordion.Trigger>
				<Accordion.Content>
					Yes, our app supports bulk resizing, allowing you to process multiple images or an entire
					folder simultaneously.
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
