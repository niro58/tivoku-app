<script lang="ts">
	import type { Snippet } from 'svelte';

	type FileDropProps = {
		ref?: HTMLInputElement | null;
		children: Snippet;
		class?: string;
		accept?: string;
		ondragenter?: (e: DragEvent) => void;
		ondragleave?: (e: DragEvent) => void;
		onfileaccept: (files: FileList) => void;
		onclick?: (e: MouseEvent) => void;
	};
	let {
		ref = $bindable(null),
		children,
		class: className,
		accept: acceptFiles,
		ondragenter,
		ondragleave,
		onfileaccept,
		onclick
	}: FileDropProps = $props();
</script>

<button
	class={className}
	{ondragenter}
	{ondragleave}
	{onclick}
	ondragover={ondragenter}
	ondrop={(e) => {
		console.log('yo');
		e.preventDefault();
		e.stopPropagation();

		const dt = e.dataTransfer;
		if (dt?.files) {
			onfileaccept(dt.files);
		}
	}}
>
	{@render children()}
	<input
		type="file"
		accept={acceptFiles || ''}
		class="hidden"
		bind:this={ref}
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
