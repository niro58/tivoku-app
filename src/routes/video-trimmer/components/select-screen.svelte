<script lang="ts">
	import { CONSTANTS } from '$data/constants';
	import FileDropper from '$lib/components/file-dropper.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';

	import { ArrowRight, Check, Video, Upload } from 'lucide-svelte';
	import type { VideoTrimmer } from '$lib/models/video-trimmer.svelte';
	let {
		videoEditor = $bindable(),
		changeMode
	}: { videoEditor: VideoTrimmer; changeMode: () => void } = $props();
	let fileInputEl: HTMLInputElement | undefined = $state();
</script>

<div class="container pb-16 pt-16">
	<section class="mb-8 flex flex-col items-center space-y-4 text-center">
		<div class="space-y-2">
			<h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
				Free Video Editor
			</h1>
			<p class="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
				Effortlessly edit your videos with this free online tool. Using the cutting-edge ffmpeg.wasm
				engine, all video processing happens locally on your device—ensuring complete privacy and
				lightning-fast performance. Trim videos, resize them, change aspect ratios, and export in
				popular formats like MP4, MOV, and MKV. Perfect for content creators, social media managers,
				or personal projects.
			</p>
		</div>
	</section>

	<section class="grid min-h-[50vh] gap-8 md:grid-cols-2 lg:gap-12">
		<Card.Root class="grid grid-cols-1 grid-rows-1 border-2 border-dashed border-muted">
			<Card.Content class="p-6">
				<FileDropper
					class="rounded-lg border-2 border-dashed border-muted-foreground/25 transition-colors hover:border-primary/50 hover:bg-primary/10"
					bind:fileInputEl
					accept="video/mp4,video/x-m4v,video/*"
					startsWith="video/"
					maxSize={CONSTANTS.MAX_VIDEO_SIZE}
					onfileaccept={(files) => {
						if (files.length > 0) {
							changeMode();
							videoEditor.load(files[0]);
						}
					}}
					onclick={() => {
						fileInputEl?.click();
					}}
				>
					<div class="flex h-full flex-col items-center justify-center space-y-4 p-8">
						<div class="rounded-full bg-primary/10 p-4">
							<Upload class="h-8 w-8 text-primary" />
						</div>
						<div class="space-y-2 text-center">
							<h3 class="text-lg font-semibold">Upload Your Video</h3>
							<p class="text-sm text-muted-foreground">
								Supports MP4, MOV, MKV, AVI, and other popular formats.
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
							<h3 class="font-semibold">1. Upload Your Video:</h3>
							<p class="text-sm text-muted-foreground">
								Drag and drop your video file or select it from your device.
							</p>
						</div>
					</div>
					<div class="flex items-start space-x-4">
						<div class="rounded-full bg-primary/10 p-2">
							<Video class="h-4 w-4 text-primary" />
						</div>
						<div>
							<h3 class="font-semibold">2. Edit Your Video:</h3>
							<p class="text-sm text-muted-foreground">
								Trim unwanted sections, resize, or adjust the aspect ratio effortlessly.
							</p>
						</div>
					</div>
					<div class="flex items-start space-x-4">
						<div class="rounded-full bg-primary/10 p-2">
							<ArrowRight class="h-4 w-4 text-primary" />
						</div>
						<div>
							<h3 class="font-semibold">3. Export and Save:</h3>
							<p class="text-sm text-muted-foreground">
								Save the final video directly to your device with no loss in quality.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="mt-16">
		<h2 class="mb-8 text-2xl font-semibold">Why Choose This Video Editor?</h2>
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each ['Completely local: All video processing happens in your browser for unmatched privacy.', 'Supports popular video formats: MP4, MOV, MKV, AVI, and more.', 'No limitations: Edit videos of any length or size.', 'Trim, resize, and adjust aspect ratios with ease.', 'Powered by ffmpeg.wasm for fast, efficient performance.', 'Totally free: No subscriptions, sign-ups, or hidden fees.'] as feature}
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
			Your videos are processed entirely in your browser using ffmpeg.wasm. No data is uploaded to a
			server, ensuring complete security and confidentiality for your files.
		</p>
	</section>

	<section class="mt-16">
		<h2 class="mb-8 text-2xl font-semibold">Frequently Asked Questions</h2>
		<Accordion.Root type="single" class="w-full">
			<Accordion.Item value="faq-video-formats">
				<Accordion.Trigger>What video formats are supported?</Accordion.Trigger>
				<Accordion.Content>
					This editor supports MP4, MOV, MKV, AVI, and other popular video file types.
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="faq-privacy">
				<Accordion.Trigger>Is my video data secure?</Accordion.Trigger>
				<Accordion.Content>
					Yes, all video editing is done locally on your device. No files are sent to external
					servers.
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="faq-performance">
				<Accordion.Trigger>What affects the processing speed?</Accordion.Trigger>
				<Accordion.Content>
					The speed of video editing depends entirely on your device’s hardware, as all processes
					are local.
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</section>
</div>
