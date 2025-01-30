<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { VideoEditor } from '$lib/models/video-editor.svelte';
	import EditorScreen from './components/editor-screen.svelte';
	import SelectScreen from './components/select-screen.svelte';

	let videoEditor = $state(new VideoEditor());
</script>

<div class="min-h-screen bg-gradient-to-b from-background to-background/80 pb-16">
	<section class="py-12 md:py-16 lg:py-20">
		<div class="container flex flex-col gap-5 px-4 md:px-6 lg:min-h-[75vh]">
			<SelectScreen bind:videoEditor />
			{#if videoEditor.videos.length > 0}
				<EditorScreen bind:videoEditor />
			{/if}
		</div>
	</section>
</div>
