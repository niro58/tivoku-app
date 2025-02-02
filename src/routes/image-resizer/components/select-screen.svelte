<script module>
	const steps = [
		{
			icon: Upload,
			title: 'Upload Your Image:',
			description: 'Drag and drop your image or select it from your device.'
		},
		{
			icon: ImageIcon,
			title: 'Set New Dimensions:',
			description: 'Enter the desired width and height for your image.'
		},
		{
			icon: ArrowRight,
			title: 'Resize and Download:',
			description: 'Resize the images using available options and download the resized images.'
		}
	];
</script>

<script lang="ts">
	import { CONSTANTS } from '$data/constants';
	import FileDropper from '$lib/components/file-dropper.svelte';
	import { EditableImage } from '$lib/models/editable-image.svelte';
	import { getImageEditor } from '$lib/models/image-editor.svelte';
	import { ArrowRight, ArrowUpFromLine, ImageIcon, Upload, Zap } from 'lucide-svelte';
	import { fade, fly, scale } from 'svelte/transition';
	let fileInputEl: HTMLInputElement | undefined = $state();

	const imageEditor = getImageEditor();
</script>

<div transition:fly={{ duration: 600, y: 20 }} class="mx-auto max-w-4xl">
	<div class="mb-16 space-y-6 text-center">
		<h1 class="text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
			Free Online Bulk Image Resizer
		</h1>
		<p class="text-2xl font-medium text-primary md:text-3xl">
			Resize Images Without Losing Quality
		</p>
		<div
			class="text-neutral-background mx-auto grid max-w-3xl gap-4 text-base md:grid-cols-3 md:gap-8 md:text-lg"
		>
			<div class="rounded-lg border border-foreground/10 bg-foreground/5 p-4 backdrop-blur-sm">
				Bulk resize multiple images at once
			</div>
			<div class="rounded-lg border border-foreground/10 bg-foreground/5 p-4 backdrop-blur-sm">
				Maintain original image quality
			</div>
			<div class="rounded-lg border border-foreground/10 bg-foreground/5 p-4 backdrop-blur-sm">
				Perfect for social media & web
			</div>
		</div>
	</div>
</div>

<div class="grid gap-12 md:grid-cols-2">
	<FileDropper
		bind:fileInputEl
		accept="image/*"
		startsWith="image/"
		maxSize={CONSTANTS.MAX_IMAGE_SIZE}
		onfileaccept={(files) => {
			const editableImages = Array.from(files).map((file) => new EditableImage(file));
			imageEditor.images.push(...editableImages);
		}}
		onclick={() => {
			fileInputEl?.click();
		}}
	>
		<div
			transition:scale={{ duration: 600, start: 0.95 }}
			class="in-colors group relative h-full rounded-2xl border-2 border-dashed border-foreground/20 bg-background/20 p-12 text-center backdrop-blur-sm hover:border-primary/40"
		>
			<div
				class="in-opacity absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 duration-300 group-hover:opacity-100"
			></div>
			<div class="mb-6 flex justify-center">
				<div class="rounded-full bg-foreground/5 p-4 text-primary">
					<ArrowUpFromLine class="h-8 w-8" />
				</div>
			</div>
			<h3 class="mb-2 text-xl font-semibold text-foreground">Drag and drop your image here</h3>
			<p class="text-neutral-background text-sm">Supports PNG, JPG, and WebP formats up to 20MB</p>
		</div>
	</FileDropper>

	<div
		in:fly={{ duration: 600, y: 20, delay: 400 }}
		out:fly={{ duration: 600, y: 20 }}
		class="space-y-8"
	>
		<h2 class="text-2xl font-bold text-foreground">How to Resize an Image</h2>
		<div class="space-y-6">
			{#each steps as step, index}
				<div class="flex items-start gap-4">
					<div class="rounded-full bg-primary/10 p-3 text-primary"><step.icon /></div>
					<div>
						<h3 class="mb-1 font-semibold text-foreground">
							{index + 1}. {step.title}
						</h3>
						<p class="text-neutral-background text-sm">{step.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
