<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { VideoEditor } from '$lib/models/video-editor.svelte';
	import EditorScreen from './components/editor-screen.svelte';
	import SelectScreen from './components/select-screen.svelte';

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
<div class="min-h-screen bg-gradient-to-b from-background to-background/80 pb-16">
	<section class="py-12 md:py-16 lg:py-20">
		<div class="container px-4 md:px-6 lg:min-h-[75vh]">
			{#if mode === 'select'}
				<SelectScreen bind:videoEditor {changeMode} />
			{:else}
				<EditorScreen bind:videoEditor {changeMode} />
			{/if}
		</div>
	</section>
</div>
