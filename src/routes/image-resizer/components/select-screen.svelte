<script lang="ts">
	import { CONSTANTS } from '$data/constants';
	import FileDropper from '$lib/components/file-dropper.svelte';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { EditableImage } from '$lib/models/editable-image.svelte';
	import { getImageEditor } from '$lib/models/image-editor.svelte';
	import { ArrowRight, Check, ImageIcon, Upload } from 'lucide-svelte';
	let fileDropperRef: HTMLInputElement | null = $state(null);

	const imageEditor = getImageEditor();
</script>

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
				maxSize={CONSTANTS.MAX_IMAGE_SIZE}
				onfileaccept={(files) => {
					const editableImages = Array.from(files).map((file) => new EditableImage(file));
					imageEditor.images.push(...editableImages);
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
