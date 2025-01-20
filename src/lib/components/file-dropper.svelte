<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import { toast } from 'svelte-sonner';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type FileDropProps = {
		fileInputRef?: HTMLInputElement | null;
		children: Snippet;
		accept?: string;
		startsWith?: string;
		maxSize?: number;
		onfileaccept: (files: FileList) => void;
	} & WithElementRef<HTMLButtonAttributes>;
	let {
		fileInputRef = $bindable(null),
		class: className,
		onfileaccept,
		children,
		accept,
		startsWith = 'image/',
		maxSize = 50 * 1024 * 1024,
		...restProps
	}: FileDropProps = $props();

	let isDragging = $state(false);
	function onError(message: string) {
		toast.warning(message);
	}
</script>

<button
	class={cn(
		'h-full w-full',
		className,
		isDragging ? 'border-primary/50 bg-primary/10 transition-colors' : ''
	)}
	ondrop={(e) => {
		e.preventDefault();
		isDragging = false;

		const dt = e.dataTransfer;
		if (dt) {
			const files = dt.files;
			if (files.length > 50) {
				onError('Maximum 50 files allowed');
				return;
			}
			for (let i = 0; i < dt.files.length; i++) {
				const file = dt.files.item(i);
				if (!file || file === null) {
					onError('Invalid file');
					return;
				}
				if (!file.type.startsWith(startsWith)) {
					onError('Invalid file type');
					return;
				}
				if (file.size > maxSize) {
					onError('File size exceeds the limit');
					return;
				}
			}

			onfileaccept(files);
		}
	}}
	ondragover={(e) => {
		e.preventDefault();
		isDragging = true;
	}}
	ondragenter={() => {
		isDragging = true;
	}}
	ondragleave={() => {
		isDragging = false;
	}}
	{...restProps}
>
	{@render children()}
	<input
		type="file"
		accept={accept || ''}
		class="hidden"
		bind:this={fileInputRef}
		multiple
		onchange={(e) => {
			const target = e.target;
			if (target instanceof HTMLInputElement && target.files) {
				const files = target.files;
				onfileaccept(files);
			}
		}}
	/>
</button>
