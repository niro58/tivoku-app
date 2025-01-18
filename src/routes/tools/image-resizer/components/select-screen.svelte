<script lang="ts">
	import FileDropper from '$lib/components/file-dropper.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { EditableImage } from '$lib/models/image.svelte';
	import { getImageEditor } from '$lib/modules/image-editor.svelte';
	import { ArrowRight, ImageIcon, Upload } from 'lucide-svelte';
	let fileDropperRef: HTMLInputElement | null = $state(null);
	import { toast } from 'svelte-sonner';

	const imageEditor = getImageEditor();
</script>

<div class="mb-8 flex flex-col items-center space-y-4 text-center">
	<div class="space-y-2">
		<h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
			Simply Resize
		</h1>
		<p class="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
			Transform your images to any size while maintaining quality. Free, fast, and no sign-up
			required.
		</p>
	</div>
</div>

<div class="grid gap-8 md:grid-cols-2 lg:gap-12">
	<Card.Root class="grid grid-cols-1 grid-rows-1 border-2 border-dashed border-muted">
		<Card.Content class="p-6">
			<FileDropper
				class="rounded-lg border-2 border-dashed border-muted-foreground/25 transition-colors hover:border-primary/50 hover:bg-primary/10"
				bind:fileInputRef={fileDropperRef}
				accept="image/*"
				startsWith="image/"
				maxSize={10 * 1024 * 1024}
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
							Supports PNG, JPG, and WebP formats up to 10MB
						</p>
					</div>
				</div>
			</FileDropper>
		</Card.Content>
	</Card.Root>

	<div class="space-y-8">
		<div class="space-y-4">
			<h2 class="text-2xl font-bold">How It Works</h2>
			<div class="grid gap-4">
				<div class="flex items-start space-x-4">
					<div class="rounded-full bg-primary/10 p-2">
						<Upload class="h-4 w-4 text-primary" />
					</div>
					<div>
						<h3 class="font-semibold">1. Upload Your Image</h3>
						<p class="text-sm text-muted-foreground">
							Drag and drop your image or click to select from your device.
						</p>
					</div>
				</div>
				<div class="flex items-start space-x-4">
					<div class="rounded-full bg-primary/10 p-2">
						<ImageIcon class="h-4 w-4 text-primary" />
					</div>
					<div>
						<h3 class="font-semibold">2. Choose Your Settings</h3>
						<p class="text-sm text-muted-foreground">
							Select your desired format, aspect ratio, and quality settings.
						</p>
					</div>
				</div>
				<div class="flex items-start space-x-4">
					<div class="rounded-full bg-primary/10 p-2">
						<ArrowRight class="h-4 w-4 text-primary" />
					</div>
					<div>
						<h3 class="font-semibold">3. Download</h3>
						<p class="text-sm text-muted-foreground">
							Click download to get your resized image instantly.
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 space-y-4 lg:grid-cols-2">
			<h2 class="text-2xl font-bold lg:col-span-2">Features</h2>
			<ul class="grid gap-4 text-sm text-muted-foreground">
				<li>✓ Multiple output formats (PNG, JPG, WebP)</li>
				<li>✓ Preserve aspect ratio or customize dimensions</li>
				<li>✓ Adjust quality settings</li>
				<li>✓ No registration required</li>
				<li>✓ Process images up to 10MB</li>
				<li>✓ Instant download</li>
			</ul>
			<div class="flex items-end">
				<div class="rounded-lg bg-muted p-4">
					<p class="text-sm text-muted-foreground">
						<strong>Privacy Note:</strong> Your images are processed entirely in your browser. We never
						store or transmit your files to any server.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
