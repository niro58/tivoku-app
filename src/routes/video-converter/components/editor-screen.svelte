<script lang="ts">
	import type { VideoEditor } from '$lib/models/video-editor.svelte';
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import { tick } from 'svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import { ResultAudioFormat, ResultVideoFormat } from '$lib/models';
	import * as Card from '$lib/components/ui/card/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { CheckCircle2, X } from 'lucide-svelte';
	import { fade, slide } from 'svelte/transition';
	import { Label } from '$lib/components/ui/label';
	import { Progress } from '$lib/components/ui/progress';
	import Input from '$lib/components/ui/input/input.svelte';

	let { videoEditor = $bindable() }: { videoEditor: VideoEditor } = $props();

	let formatOpen = $state(false);
	let formatTriggerRef: HTMLButtonElement | null = $state(null);
	function closeAndFocusTrigger(type: 'audio' | 'video') {
		tick().then(() => {
			formatOpen = false;
			formatTriggerRef?.focus();
		});
	}
</script>

<div class="grid grid-cols-2 gap-5" in:slide={{ duration: 500 }} out:slide={{ duration: 500 }}>
	<Card.Root class="mb-8 h-full">
		<Card.Content class="p-6">
			<h2 class="mb-4 text-xl font-semibold">Imported Videos</h2>
			<ScrollArea class="h-[300px] w-full rounded-md border p-4">
				{#each videoEditor.videos as video, index (index)}
					<div
						class="flex h-16 flex-col items-center justify-between border-b px-2 py-2 last:border-b-0"
						in:fade
						out:fade
					>
						<div class="flex w-full items-center">
							<div class="mr-4 h-9 w-16 rounded bg-gray-200/50"></div>
							<Input bind:value={video.filename} class="" />
							{#key video.currState}
								<div class="flex h-full w-16 items-center justify-center" in:fade out:fade>
									{#if video.currState === 'none'}
										<Button
											variant="ghost"
											size="icon"
											onclick={() => {
												videoEditor.videos = videoEditor.videos.filter((_, i) => i !== index);
											}}
										>
											<X class="h-4 w-4" />
										</Button>
									{:else if video.currState === 'exporting'}
										<span>{Math.round(video.currProgress.current)}%</span>
									{:else if video.currState === 'done'}
										<CheckCircle2 class="mr-2 h-6 w-6 text-green-500" />
									{/if}
								</div>
							{/key}
						</div>
						{#if video.currState === 'exporting'}
							<div in:fade out:fade class="flex w-full flex-row items-center justify-center gap-3">
								<Progress class="w-full" value={video.currProgress.current} />
							</div>
						{/if}
					</div>
				{/each}
			</ScrollArea>
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Content class="p-6">
			<h2 class="mb-4 text-xl font-semibold">Conversion Options</h2>
			<div class="flex space-x-4">
				<div class="w-1/2">
					<Label class="mb-2 block text-sm font-medium" for="video-format">Convert to:</Label>
					<Popover.Root bind:open={formatOpen}>
						<Popover.Trigger id="video-format">
							{#snippet child({ props })}
								<Button
									variant="outline"
									class="w-[200px] justify-between"
									{...props}
									role="combobox"
									aria-expanded={formatOpen}
								>
									{#if Object.values(ResultVideoFormat).includes(videoEditor.exportSettings.exportFormat as ResultVideoFormat)}
										{videoEditor.exportSettings.exportFormat?.toUpperCase()}
									{:else}
										Select Video Format
									{/if}
									<ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
								</Button>
							{/snippet}
						</Popover.Trigger>
						<Popover.Content class="w-[200px] p-0">
							<Command.Root>
								<Command.Input placeholder="Search format..." />
								<Command.List>
									<Command.Empty>No framework found.</Command.Empty>
									<Command.Group heading="Video Formats">
										{#each Object.entries(ResultVideoFormat) as [k, v]}
											<Command.Item
												value={v}
												onSelect={() => {
													videoEditor.exportSettings.exportFormat = v;
													closeAndFocusTrigger('video');
												}}
											>
												<Check
													class={cn(
														'mr-2 size-4',
														v !== videoEditor.exportSettings.exportFormat && 'text-transparent'
													)}
												/>
												{v.toUpperCase()}
											</Command.Item>
										{/each}
									</Command.Group>
									<Command.Group heading="Audio Formats">
										{#each Object.entries(ResultAudioFormat) as [k, v]}
											<Command.Item
												value={v}
												onSelect={() => {
													videoEditor.exportSettings.exportFormat = v;
													closeAndFocusTrigger('audio');
												}}
											>
												<Check
													class={cn(
														'mr-2 size-4',
														v !== videoEditor.exportSettings.exportFormat && 'text-transparent'
													)}
												/>
												{v.toUpperCase()}
											</Command.Item>
										{/each}
									</Command.Group>
								</Command.List>
							</Command.Root>
						</Popover.Content>
					</Popover.Root>
				</div>
			</div>
			<div class="mt-6">
				<Button class="w-full" onclick={() => videoEditor.export()}>Convert Files</Button>
			</div>
		</Card.Content>
	</Card.Root>
</div>
<!-- 
<Card.Root class="mx-auto grid max-h-[75vh] w-full max-w-3xl grid-rows-12">
	<Card.Header class="row-span-1">
		<Card.Title class="text-2xl font-bold">Image Editor</Card.Title>
	</Card.Header>
	<Card.Content class="row-span-9 flex flex-col gap-6">
		<Popover.Root bind:open={formatOpen}>
			<Popover.Trigger>
				{#snippet child({ props })}
					<Button
						variant="outline"
						class="w-[200px] justify-between"
						{...props}
						role="combobox"
						aria-expanded={formatOpen}
					>
						{#if Object.values(ResultVideoFormat).includes(videoEditor.exportSettings.exportFormat as ResultVideoFormat)}
							{videoEditor.exportSettings.exportFormat?.toUpperCase()}
						{:else}
							Select Video Format
						{/if}
						<ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
					</Button>
				{/snippet}
			</Popover.Trigger>
			<Popover.Content class="w-[200px] p-0">
				<Command.Root>
					<Command.Input placeholder="Search framework..." />
					<Command.List>
						<Command.Empty>No framework found.</Command.Empty>
						<Command.Group>
							{#each Object.entries(ResultVideoFormat) as [k, v]}
								<Command.Item
									value={v}
									onSelect={() => {
										videoEditor.exportSettings.exportFormat = v;
										closeAndFocusTrigger('video');
									}}
								>
									<Check
										class={cn(
											'mr-2 size-4',
											v !== videoEditor.exportSettings.exportFormat && 'text-transparent'
										)}
									/>
									{v.toUpperCase()}
								</Command.Item>
							{/each}
						</Command.Group>
					</Command.List>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>

		<Popover.Root bind:open={audioFormatOpen}>
			<Popover.Trigger>
				{#snippet child({ props })}
					<Button
						variant="outline"
						class="w-[200px] justify-between"
						{...props}
						role="combobox"
						aria-expanded={audioFormatOpen}
					>
						{#if Object.values(ResultAudioFormat).includes(videoEditor.exportSettings.exportFormat as ResultAudioFormat)}
							{videoEditor.exportSettings.exportFormat?.toUpperCase()}
						{:else}
							Select Audio Format
						{/if}
						<ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
					</Button>
				{/snippet}
			</Popover.Trigger>
			<Popover.Content class="w-[200px] p-0">
				<Command.Root>
					<Command.Input placeholder="Search framework..." />
					<Command.List>
						<Command.Empty>No framework found.</Command.Empty>
						<Command.Group>
							{#each Object.entries(ResultAudioFormat) as [k, v]}
								<Command.Item
									value={v}
									onSelect={() => {
										videoEditor.exportSettings.exportFormat = v;
										closeAndFocusTrigger('audio');
									}}
								>
									<Check
										class={cn(
											'mr-2 size-4',
											v !== videoEditor.exportSettings.exportFormat && 'text-transparent'
										)}
									/>
									{v.toUpperCase()}
								</Command.Item>
							{/each}
						</Command.Group>
					</Command.List>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>
	</Card.Content>
	<Card.Footer class="row-span-2 flex flex-col items-start justify-end gap-5">
		<div class="flex items-center gap-2 space-x-2">
			<div class="space-x-1">
				<Checkbox
					id="zip-export"
					aria-labelledby="zip-export"
					bind:checked={() => imageEditor.settings.exportType === ResultFileFormat.ZIP,
					() => (imageEditor.settings.exportType = ResultFileFormat.ZIP)}
				/>
				<Label
					id="zip-export"
					for="zip-export"
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					ZIP
				</Label>
			</div>
			<div class="space-x-1">
				<Checkbox
					id="single-files-export"
					aria-labelledby="single-files-export"
					bind:checked={() => imageEditor.settings.exportType === ResultFileFormat.SINGLE,
					() => (imageEditor.settings.exportType = ResultFileFormat.SINGLE)}
				/>
				<Label
					id="single-files-export"
					for="single-files-export"
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					Single Files
				</Label>
			</div>
		</div>
		<Button
			class="h-12 w-full"
			onclick={async () => {
				exportState = true;
				await videoEditor.export();
				exportState = false;
			}}
		>
			Export
		</Button>
	</Card.Footer>
</Card.Root> -->
