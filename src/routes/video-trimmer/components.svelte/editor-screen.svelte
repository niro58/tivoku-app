<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Label } from '$lib/components/ui/label';
	import Progress from '$lib/components/ui/progress/progress.svelte';
	import Slider from '$lib/components/ui/slider/slider.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { VideoEditor } from '$lib/models/video-editor.svelte';
	import { cn, numberToTime } from '$lib/utils';
	import {
		ChevronRight,
		Crop,
		Maximize,
		Pause,
		Play,
		Scaling,
		Settings,
		SkipBack,
		SkipForward,
		Volume2,
		ZoomIn
	} from 'lucide-svelte';

	let {
		videoEditor = $bindable(),
		changeMode
	}: { videoEditor: VideoEditor; changeMode: () => void } = $props();
	let isRightPanelOpen = $state(true);
</script>

<main class="flex flex-1 overflow-hidden">
	<section
		class={`flex flex-1 flex-col p-4 transition-all duration-300 ease-in-out ${isRightPanelOpen ? 'mr-80' : ''}`}
	>
		<div class="relative mb-4 aspect-video max-h-[75vh] rounded-lg bg-black/50 shadow-lg">
			<video
				src="test.webm"
				bind:this={videoEditor.videoEl}
				bind:paused={videoEditor.isPaused}
				bind:currentTime={videoEditor.currTime}
				class="h-full w-full"
			>
				<track kind="captions" />
			</video>
			<div class="absolute inset-0 flex items-center justify-center">
				{#if videoEditor.currProgress < 100}
					<div class="absolute inset-0 flex items-center justify-center">
						<Progress value={videoEditor.currProgress} class="w-1/2" />
					</div>
				{:else}
					<button
						class={cn(
							'flex h-full w-full items-center justify-center p-2 text-white transition-all duration-300 hover:bg-gray-400/20',
							!videoEditor.isPaused && 'opacity-0 hover:opacity-100'
						)}
						onclick={() => {
							videoEditor.isPaused = !videoEditor.isPaused;
						}}
					>
						{#if videoEditor.isPaused}
							<Play class="h-12 w-12" />
						{:else}
							<Pause class="h-12 w-12" />
						{/if}
					</button>
				{/if}
			</div>
			<div class="absolute bottom-4 right-4 space-x-2">
				<Button
					variant="ghost"
					size="icon"
					onclick={() => (isRightPanelOpen = true)}
					class={isRightPanelOpen === false ? 'border border-primary' : ''}
				>
					<Settings class="h-4 w-4" />
				</Button>
				<Button variant="ghost" size="icon" class="text-white">
					<Maximize class="h-6 w-6" />
				</Button>
			</div>
		</div>

		<Card.Root class="mb-4 flex-shrink-0">
			<Card.Content class="py-3">
				<div class="relative mb-2">
					<Slider
						type="multiple"
						class="w-full"
						bind:value={() => videoEditor.trim,
						(value) => {
							if (value[0] === videoEditor.trim[0] && value[1] === videoEditor.trim[1]) return;
							videoEditor.isPaused = true;
							videoEditor.trim = value;
						}}
						max={videoEditor.duration}
						step={videoEditor.duration / 100}
					></Slider>
				</div>
				<div class="text-s mb-2 flex items-center justify-between">
					<span>{numberToTime(0)}</span>
					<span class="font-medium">{numberToTime(videoEditor.duration / 2)}</span>
					<span>{numberToTime(videoEditor.duration)}</span>
				</div>
				<Slider
					type="single"
					bind:value={() => videoEditor.currTime,
					(value) => {
						if (isNaN(value) || Math.abs(videoEditor.currTime - value) < videoEditor.duration / 100)
							return;
						console.log(videoEditor.currTime, value);
						videoEditor.currTime = value;
					}}
					max={videoEditor.duration}
					step={videoEditor.duration / 100}
					class="w-full"
				/>
				<div class="flex items-center justify-center">
					{numberToTime(videoEditor.currTime)}
				</div>
			</Card.Content>
		</Card.Root>

		<div class="mb-4 flex flex-shrink-0 justify-center space-x-2">
			<Button
				variant="outline"
				size="sm"
				onclick={() => {
					videoEditor.currTime = videoEditor.trim[0];
					videoEditor.isPaused = true;
				}}
			>
				<SkipBack class="h-4 w-4" />
			</Button>
			<Button
				variant="outline"
				size="sm"
				onclick={() => {
					videoEditor.isPaused = !videoEditor.isPaused;
				}}
			>
				{#if videoEditor.isPaused}
					<Play class="h-4 w-4" />
				{:else}
					<Pause class="h-4 w-4" />
				{/if}
			</Button>
			<Button
				variant="outline"
				size="sm"
				onclick={() => {
					videoEditor.currTime = videoEditor.trim[1];
					videoEditor.isPaused = true;
				}}
			>
				<SkipForward class="h-4 w-4" />
			</Button>
			<Button onclick={() => videoEditor.export()}>Download</Button>
		</div>
	</section>

	<aside
		class={`fixed right-0 top-0 h-full overflow-y-auto border-l transition-all duration-300 ease-in-out ${isRightPanelOpen ? 'w-80' : 'w-0'}`}
	>
		<div class="p-4 pt-24">
			<Button
				variant="ghost"
				size="icon"
				class="mb-4"
				onclick={() => (isRightPanelOpen = !isRightPanelOpen)}
			>
				<ChevronRight class="h-4 w-4" />
			</Button>
			<Tabs.Root value="edit" class="w-full">
				<Tabs.List class="mb-4 grid w-full grid-cols-2">
					<Tabs.Trigger value="edit">Edit</Tabs.Trigger>
					<Tabs.Trigger value="export">Export</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="edit">
					<div class="space-y-4">
						<div>
							<h3 class="text-s mb-2 font-medium">Crop</h3>
							<div class="flex items-center space-x-2">
								<Crop className="h-4 w-4 text-gray-500" />
								<Button variant="outline" size="sm">16:9</Button>
								<Button variant="outline" size="sm">4:3</Button>
								<Button variant="outline" size="sm">1:1</Button>
								<Button variant="outline" size="sm">Reset</Button>
							</div>
						</div>
						<div>
							<Label for="volume" class="mb-1 text-xs font-medium">Volume</Label>
							<div class="flex items-center space-x-2">
								<Volume2 class="h-4 w-4 text-gray-500" />
								<Slider type="single" id="volume" value={75} max={100} step={1} class="w-full" />
							</div>
						</div>

						<div>
							<Label for="speed" class="mb-1 text-xs font-medium ">Playback Speed</Label>
							<Slider
								type="single"
								id="speed"
								value={100}
								max={200}
								min={50}
								step={10}
								class="w-full"
							/>
						</div>

						<div>
							<Label for="opacity" class="mb-1 text-xs font-medium">Opacity</Label>
							<Slider type="single" id="opacity" value={100} max={100} step={1} class="w-full" />
						</div>
					</div>

					<div>Zooming and moving can be done inside the video player</div>
				</Tabs.Content>

				<Tabs.Content value="export">
					<div class="space-y-4">
						<div>
							<h3 class="mb-2 text-sm font-medium">Color Adjustment</h3>
							<div class="grid grid-cols-2 gap-2">
								<Button variant="outline" size="sm">Brightness</Button>
								<Button variant="outline" size="sm">Contrast</Button>
								<Button variant="outline" size="sm">Saturation</Button>
								<Button variant="outline" size="sm">Hue</Button>
							</div>
						</div>
						<div>
							<h3 class="mb-2 text-sm font-medium">Filters</h3>
							<div class="grid grid-cols-2 gap-2">
								<Button variant="outline" size="sm">Sepia</Button>
								<Button variant="outline" size="sm">Grayscale</Button>
								<Button variant="outline" size="sm">Vintage</Button>
								<Button variant="outline" size="sm">Vignette</Button>
							</div>
						</div>
						<Button variant="outline" size="sm" class="w-full">
							<Settings class="mr-2 h-4 w-4" />
							Advanced Effects
						</Button>
					</div>
				</Tabs.Content>
			</Tabs.Root>
		</div>
	</aside>
</main>
