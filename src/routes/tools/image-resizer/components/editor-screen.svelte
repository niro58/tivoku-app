<script module lang="ts">
	const aspectRatios: {
		key: string;
		title: string;
	}[] = [
		{ key: aspectRatioToKey({ x: 1, y: 1 }), title: '1 : 1 - Square' },
		{ key: aspectRatioToKey({ x: 16, y: 9 }), title: '16 : 9 - Best for XY' },
		{ key: aspectRatioToKey({ x: 4, y: 3 }), title: '4 : 3 - Best for XY' }
	];
	const colorPrefabs = [
		{
			hex: '#000000',
			opacity: 0,
			label: 'Transparent',
			class: 'bg-transparent border-2 border-dashed border-gray-400'
		},
		{ hex: '#000000', opacity: 1, label: 'Black', class: 'bg-black' },
		{ hex: '#ffffff', opacity: 1, label: 'White', class: 'bg-white border border-gray-200' }
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
	import {
		aspectRatioToKey,
		getImageEditor,
		ImageExportFormats,
		keyToAspectRatio
	} from '$lib/modules/image-editor.svelte';
	import { Check, Pencil, Plus, X } from 'lucide-svelte';

	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import FileDropper from '$lib/components/file-dropper.svelte';
	import { EditableImage } from '$lib/models/image.svelte';

	let fileDropperRef: HTMLInputElement | null = $state(null);
	let isDragging = $state(false);

	const imageEditor = getImageEditor();
</script>

<div class="grid h-full grid-rows-1 gap-8 md:grid-cols-2 lg:gap-12">
	<FileDropper
		class="h-full w-full cursor-default"
		bind:ref={fileDropperRef}
		accept="image/*"
		ondragenter={() => {
			isDragging = true;
		}}
		ondragleave={() => {
			isDragging = false;
		}}
		onfileaccept={(files) => {
			const editableImages = Array.from(files).map((file) => new EditableImage(file));
			imageEditor.images = [...imageEditor.images, ...editableImages];
		}}
	>
		<Card.Root class="grid grid-cols-1 grid-rows-8 border-2 border-muted">
			<Card.Content class="row-span-7 p-6">
				<ScrollArea class="h-full rounded-md border p-4">
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head>Image</Table.Head>
								<Table.Head>Filename</Table.Head>
								<Table.Head class="w-32">Width</Table.Head>
								<Table.Head class="w-32">Height</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each imageEditor.images as image, index}
								{@const size = image.getCanvasSize(imageEditor.settings.aspectRatio)}
								<Table.Row>
									<Table.Cell>
										<img
											src={image.src}
											class="flex aspect-square h-16 w-16 items-center justify-center rounded-xl border-2 object-contain p-1"
											alt={'User image ' + index}
										/>
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
				<Button class="mt-5 h-16 w-full text-xl" onclick={() => fileDropperRef?.click()}
					><Plus /></Button
				>
			</Card.Content>
		</Card.Root>
	</FileDropper>
	<Card.Root class="mx-auto w-full max-w-3xl">
		<Card.Header>
			<Card.Title class="text-2xl font-bold">Image Editor</Card.Title>
		</Card.Header>
		<Card.Content class="grid gap-6">
			<div class="space-y-2">
				<Label>Resizing Type</Label>
				<RadioGroup.Root
					bind:value={() => imageEditor.settings.cropType,
					(v) => {
						console.log(v);
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
							class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
						>
							<span>Crop Inside</span>
						</Label>
					</div>
					<div>
						<RadioGroup.Item value="outside" id="outside" class="peer sr-only" />
						<Label
							for="outside"
							class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
						>
							<span>Crop Out</span>
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
								<Check class={`mx-auto ${color.hex === '#ffffff' ? 'text-black' : 'text-white'}`} />
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
		<Card.Footer>
			<Button
				class="w-full"
				onclick={() => {
					imageEditor.exportImages();
				}}>Export</Button
			>
		</Card.Footer>
	</Card.Root>
</div>
