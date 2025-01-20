<script lang="ts">
	import { setImageEditor } from '$lib/models/image-editor.svelte';

	let { children } = $props();
	setImageEditor();
</script>

{@render children()}
