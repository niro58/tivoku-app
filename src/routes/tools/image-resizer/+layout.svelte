<script lang="ts">
	import { setImageEditor } from '$lib/modules/image-editor.svelte';

	let { children } = $props();
	setImageEditor();
</script>

{@render children()}
