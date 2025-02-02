<script module lang="ts">
	const aspectRatios: {
		key: string;
		title: string;
	}[] = [
		{ key: aspectRatioToKey({ x: 1, y: 1 }), title: '1 : 1 - Square (Versatile for Posts)' },
		{
			key: aspectRatioToKey({ x: 16, y: 9 }),
			title: '16 : 9 - Widescreen'
		},
		{
			key: aspectRatioToKey({ x: 4, y: 5 }),
			title: '4 : 5 - Portrait (Instagram Posts)'
		},
		{
			key: aspectRatioToKey({ x: 9, y: 16 }),
			title: '9 : 16 - Vertical (Stories and Reels)'
		}
	];
	const colorPrefabs = [
		{
			hex: '#000000',
			opacity: 0,
			label: 'Transparent',
			class: 'bg-transparent border-2 border-dashed border-gray-400'
		},
		{ hex: '#000000', opacity: 1, label: 'Black', class: 'bg-background' },
		{ hex: '#ffffff', opacity: 1, label: 'White', class: 'bg-foreground border border-gray-200' }
	];
</script>

<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';

	import ColorInput from '$lib/components/ui/color-input.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import * as Select from '$lib/components/ui/select';
	import * as Table from '$lib/components/ui/table/index.js';
	import { getImageEditor } from '$lib/models/image-editor.svelte';
	import { Check, Crop, Loader, Maximize2, Pencil, Plus, Trash2, X } from 'lucide-svelte';

	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import FileDropper from '$lib/components/file-dropper.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { aspectRatioToKey, keyToAspectRatio } from '$lib/utils';
	import { ImageExportFormats, ExportFileFormat } from '$lib/models';
	import { CONSTANTS } from '$data/constants';
	import { EditableImage } from '$lib/models/editable-image.svelte';
	import { fly } from 'svelte/transition';

	let fileInputEl: HTMLInputElement | undefined = $state();

	const imageEditor = getImageEditor();
	let exportState = $state(false);
</script>

<div
	class="grid h-full grid-rows-1 gap-8 md:grid-cols-2 lg:gap-12"
	in:fly={{ duration: 600, delay: 600, y: 20 }}
>
	<FileDropper
		class="max-h-[75vh] cursor-default bg-card lg:h-full"
		bind:fileInputEl
		accept="image/*"
		startsWith="image/"
		maxSize={CONSTANTS.MAX_IMAGE_SIZE}
		onfileaccept={(files) => {
			const editableImages = Array.from(files).map((file) => new EditableImage(file));
			imageEditor.images.push(...editableImages);
		}}
		onclick={() => {}}
	>
		<Card.Root class="grid h-full grid-cols-1 grid-rows-8 bg-transparent">
			<Card.Content class="relative row-span-7 p-6">
				<ScrollArea class="h-full rounded-md border p-4">
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head class="w-24">Image</Table.Head>
								<Table.Head>Filename</Table.Head>
								<Table.Head class="w-32">Width</Table.Head>
								<Table.Head class="w-32">Height</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each imageEditor.images as image, index}
								{@const size = image.getCanvasSize(
									imageEditor.settings.aspectRatio,
									imageEditor.settings.cropType
								)}
								<Table.Row>
									<Table.Cell>
										{#if image.src}
											<img
												src={image.src}
												class="flex aspect-square h-16 w-16 items-center justify-center rounded-xl border-2 object-contain p-1"
												alt={'User image ' + index}
											/>
										{:else}
											<div class="flex h-16 w-16 items-center justify-center">
												<Loader class="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
											</div>
										{/if}
									</Table.Cell>
									<Table.Cell>
										<Input bind:value={image.filename} />
									</Table.Cell>
									<Table.Cell class="text-center text-lg">{size.x}</Table.Cell>
									<Table.Cell class="text-center text-lg">{size.y}</Table.Cell>
									<Table.Cell>
										<Button
											size="icon"
											onclick={() => {
												imageEditor.images = imageEditor.images.filter((_, i) => i !== index);
											}}
										>
											<X />
										</Button>
									</Table.Cell>
								</Table.Row>
							{/each}
						</Table.Body>
					</Table.Root>
				</ScrollArea>
			</Card.Content>
			<Card.Footer>
				<div class="flex w-full flex-col">
					<div class="flex flex-row gap-5">
						<Button class="mt-5 h-12 w-full text-xl" onclick={() => fileInputEl?.click()}>
							<Plus />
						</Button>
						<Button
							class="mt-5 h-12 w-12 text-xl"
							disabled={imageEditor.images.length === 0}
							onclick={() => (imageEditor.images = [])}
						>
							<Trash2 />
						</Button>
					</div>
				</div></Card.Footer
			>
		</Card.Root>
	</FileDropper>
	<Card.Root class="mx-auto grid max-h-[75vh] w-full max-w-3xl grid-rows-12">
		<Card.Header class="row-span-1">
			<Card.Title class="text-2xl font-bold">Image Editor</Card.Title>
		</Card.Header>
		<Card.Content class="row-span-9 flex flex-col gap-6">
			<div class="space-y-2">
				<Label>Resizing Type</Label>
				<RadioGroup.Root
					bind:value={() => imageEditor.settings.cropType,
					(v) => {
						if (v === 'inside' || v === 'outside') {
							imageEditor.settings.cropType = v;
						}
					}}
					class="grid grid-cols-2 gap-4"
				>
					<div>
						<RadioGroup.Item value="inside" id="inside" class="peer sr-only" />
						<Label
							for="inside"
							class="flex cursor-pointer flex-row items-center justify-center  gap-3 rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
						>
							<Crop class="h-4 w-4" />
							<span>Crop to Shortest Side</span>
						</Label>
					</div>
					<div>
						<RadioGroup.Item value="outside" id="outside" class="peer sr-only" />
						<Label
							for="outside"
							class="flex cursor-pointer flex-row items-center justify-center gap-3 rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
						>
							<Maximize2 class="h-4 w-4" />
							<span>Crop to Longest Side</span>
						</Label>
					</div>
				</RadioGroup.Root>
			</div>
			<div class="space-y-2">
				<Label>Background Color</Label>
				<div class="grid grid-cols-4 gap-2">
					{#each colorPrefabs as color}
						{@const isActive =
							imageEditor.settings.backgroundColor === color.hex &&
							imageEditor.settings.opacity === color.opacity}
						<button
							onclick={() => {
								imageEditor.settings.backgroundColor = color.hex;
								imageEditor.settings.opacity = color.opacity;
							}}
							class={`h-10 rounded-md transition-all ${color.class} ${
								isActive ? 'ring-2 ring-primary ring-offset-2' : ''
							}`}
							title={color.label}
						>
							{#if isActive}
								<Check class={`mx-auto ${color.hex === '#ffffff' ? 'text-black' : ''}`} />
							{/if}
						</button>
					{/each}
					<ColorInput
						bind:backgroundColor={imageEditor.settings.backgroundColor}
						bind:opacity={imageEditor.settings.opacity}
					>
						<Pencil class="text-primary" />
					</ColorInput>
				</div>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label for="format">Format</Label>
					<Select.Root
						type="single"
						bind:value={() => imageEditor.settings.format,
						(v) => {
							if (v in ImageExportFormats) {
								imageEditor.settings.format = v;
							}
						}}
					>
						<Select.Trigger id="format">{imageEditor.settings.format.toUpperCase()}</Select.Trigger>
						<Select.Content>
							{#each Object.entries(ImageExportFormats) as [key, value]}
								<Select.Item value={key}>{value.toUpperCase()}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
				<div class="space-y-2">
					<Label for="aspect-ratio">Aspect Ratio</Label>
					<Select.Root
						type="single"
						bind:value={() => aspectRatioToKey(imageEditor.settings.aspectRatio),
						(v) => {
							imageEditor.settings.aspectRatio = keyToAspectRatio(v);
						}}
					>
						<Select.Trigger id="aspect-ratio"
							>{aspectRatioToKey(imageEditor.settings.aspectRatio)}</Select.Trigger
						>
						<Select.Content>
							{#each aspectRatios as ratio}
								<Select.Item value={ratio.key}>{ratio.title}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label for="x">X</Label>
					<Input
						id="x"
						type="number"
						bind:value={() => imageEditor.settings.aspectRatio.x,
						(v) => {
							if (isNaN(v) || v <= 0 || v > 10000) return;
							imageEditor.settings.aspectRatio.x = v;
						}}
						min="1"
					/>
				</div>
				<div class="space-y-2">
					<Label for="y">Y</Label>
					<Input
						id="y"
						type="number"
						bind:value={() => imageEditor.settings.aspectRatio.y,
						(v) => {
							if (isNaN(v) || v <= 0 || v > 10000) return;
							imageEditor.settings.aspectRatio.y = v;
						}}
						min="1"
					/>
				</div>
			</div>
		</Card.Content>
		<Card.Footer class="row-span-2 flex flex-col items-start justify-end gap-5">
			<div class="flex items-center gap-2 space-x-2">
				<div class="space-x-1">
					<Checkbox
						id="zip-export"
						aria-labelledby="zip-export"
						bind:checked={() => imageEditor.settings.exportFileFormat === ExportFileFormat.ZIP,
						() => (imageEditor.settings.exportFileFormat = ExportFileFormat.ZIP)}
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
						bind:checked={() => imageEditor.settings.exportFileFormat === ExportFileFormat.SINGLE,
						() => (imageEditor.settings.exportFileFormat = ExportFileFormat.SINGLE)}
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
				disabled={imageEditor.images.length === 0 || exportState}
				onclick={async () => {
					exportState = true;
					await imageEditor.export();
					exportState = false;
				}}
			>
				Export
			</Button>
		</Card.Footer>
	</Card.Root>
</div>
<div class="text-start text-muted-foreground">
	* Images can also be dragged into the image square
</div>
