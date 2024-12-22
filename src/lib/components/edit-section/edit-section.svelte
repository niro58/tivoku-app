<script lang="ts">
	import ImageList from './image-list.svelte';
	import ImagePreview from './image-preview.svelte';
	import EditingMenu from './editing-menu.svelte';
	import Debugger from './debugger.svelte';
</script>

<div class="grid h-screen max-h-screen grid-cols-12 grid-rows-1 flex-col gap-4 p-5 lg:flex-row">
	<div class="col-span-2 rounded-lg border border-white shadow">
		<ImageList />
	</div>
	<div class="col-span-7 flex overflow-hidden rounded-lg shadow-md">
		<ImagePreview />
	</div>
	<div class="col-span-3 space-y-4 rounded-lg border border-white p-4 shadow">
		<EditingMenu />
	</div>
</div>

<Debugger />
