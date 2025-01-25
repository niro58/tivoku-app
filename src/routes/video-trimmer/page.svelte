<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { VideoEditor } from '$lib/models/video-editor.svelte';
	import EditorScreen from './components.svelte/editor-screen.svelte';
	import SelectScreen from './components.svelte/select-screen.svelte';

	let videoEditor = $state(new VideoEditor());
	let mode: 'select' | 'edit' = $state('select');
	function changeMode() {
		mode = mode === 'select' ? 'edit' : 'select';
	}
</script>

<div class="absolute left-16 top-16 z-50">
	<Button onclick={() => (mode = 'select')}>Select</Button>
	<Button onclick={() => (mode = 'edit')}>Edit</Button>
</div>
{#if mode === 'select'}
	<SelectScreen bind:videoEditor {changeMode} />
{:else}
	<EditorScreen bind:videoEditor {changeMode} />
{/if}
