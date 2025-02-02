<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { VideoTrimmer } from '$lib/models/video-trimmer.svelte';
	import EditorScreen from './components/editor-screen.svelte';
	import SelectScreen from './components/select-screen.svelte';

	let videoEditor = $state(new VideoTrimmer());
	let mode: 'select' | 'edit' = $state('edit');
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
