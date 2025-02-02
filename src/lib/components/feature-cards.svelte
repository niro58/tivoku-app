<script lang="ts">
	const { features }: { features: { title: string; description: string; icon: any }[] } = $props();
</script>

<div class="container relative mx-auto px-4">
	<div class="grid gap-8 md:grid-cols-3">
		{#each features as feature}
			<div
				class="group relative overflow-hidden rounded-xl border border-foreground/10 bg-background/20 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:bg-background/30"
			>
				<div class="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
					<feature.icon class="h-6 w-6" />
				</div>

				<h2 class="mb-4 text-xl font-semibold text-primary md:text-2xl">{feature.title}</h2>

				<p class="text-base leading-relaxed text-muted-foreground">{feature.description}</p>
			</div>
		{/each}
	</div>
</div>
