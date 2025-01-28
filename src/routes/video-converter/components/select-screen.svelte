<script lang="ts">
	import FileDropper from '$lib/components/file-dropper.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { CONSTANTS } from '$data/constants';
	import type { VideoEditor } from '$lib/models/video-editor.svelte';
	import { Upload } from 'lucide-svelte';

	let fileDropperRef: HTMLInputElement | null = $state(null);
	let {
		videoEditor = $bindable(),
		changeMode
	}: { videoEditor: VideoEditor; changeMode: () => void } = $props();
	let isRightPanelOpen = $state(true);
</script>

<Card.Root class="grid grid-cols-1 grid-rows-1 border-2 border-dashed border-muted">
	<Card.Content class="p-6">
		<FileDropper
			class="rounded-lg border-2 border-dashed border-muted-foreground/25 transition-colors hover:border-primary/50 hover:bg-primary/10"
			bind:fileInputRef={fileDropperRef}
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
				fileDropperRef?.click();
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
