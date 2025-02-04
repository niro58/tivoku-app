<script module>
	const tools = [
		{
			title: PAGES.IMAGE_RESIZER.title,
			description:
				'Resize images for your social media or any other needs and fill the background with a solid color',
			link: PAGES.IMAGE_RESIZER.link,
			icon: ImageIcon
		},
		{
			title: 'Video Converter',
			description: 'Change the type of your video file to another type',
			link: PAGES.VIDEO_CONVERTER.link,
			icon: Video
		},
		{
			title: 'Video Trimmer',
			description: 'Trim your video file to a specific length',
			link: '',
			icon: Video
		}
	];
</script>

<script lang="ts">
	import { ArrowRight, Clock, ImageIcon, Video } from 'lucide-svelte';
	import { PAGES } from '../../data/pages';
	import Button from './ui/button/button.svelte';
	import CircleDesignElement from './circle-design-element.svelte';
</script>

<section class="container relative py-16" id="tools">
	<div class="mx-auto">
		<CircleDesignElement variation="1" />
		<h2 class="mb-12 text-center text-3xl font-bold text-primary md:text-4xl">
			Completed and Upcoming Tools
		</h2>

		<div class="grid gap-6 md:grid-cols-3">
			{#each tools as tool}
				<div
					class="group flex flex-col justify-between rounded-xl border border-foreground/10 bg-background/20 p-8 backdrop-blur-sm transition-all hover:border-primary/20 hover:bg-background/30"
				>
					<div>
						<div class="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
							<tool.icon />
						</div>
						<h3 class="mb-3 text-xl font-semibold">{tool.title}</h3>
						<p class="mb-6 flex grow text-sm leading-relaxed text-muted-foreground">
							{tool.description}
						</p>
					</div>
					{#if tool.link !== ''}
						<Button
							href={tool.link}
							class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-primary/90"
						>
							Try Now
							<ArrowRight class="h-4 w-4" />
						</Button>
					{:else}
						<Button
							disabled={true}
							class="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-foreground/10 bg-foreground/5 px-4 py-2 text-sm font-medium text-gray-400"
						>
							Coming Soon
							<Clock class="h-4 w-4" />
						</Button>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
