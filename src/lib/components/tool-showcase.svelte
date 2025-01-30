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
			title: 'Video Type Changer',
			description: 'Change the type of your video file to another type',
			link: '',
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
</script>

<section class="relative px-4 py-24" id="tools">
	<div class="container mx-auto">
		<div class="absolute inset-0 overflow-hidden lg:overflow-clip">
			<div
				class="absolute left-1/4 top-1/4 h-[250px] w-[250px] rounded-full bg-primary/10 blur-3xl"
			></div>
		</div>
		<h2 class="mb-12 text-center text-3xl font-bold text-primary md:text-4xl">
			Completed and Upcoming Tools
		</h2>

		<div class="grid gap-6 md:grid-cols-3">
			{#each tools as tool, index}
				<div
					class="group flex flex-col justify-between rounded-xl border border-foreground/10 bg-black/20 p-8 backdrop-blur-sm transition-all hover:border-primary/20 hover:bg-black/30"
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
