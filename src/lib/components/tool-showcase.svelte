<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { ArrowRight, Clock, Loader } from 'lucide-svelte';
	import { Button } from './ui/button';
	import { pageTools } from '../../data/pages';
	let activeIndex = $state(0);
</script>

<section class="py-16">
	<div class="container px-4 md:px-6">
		<div class="space-y-16">
			{#each pageTools as category, index}
				<div
					id={category.id}
					class={`transition-opacity duration-500 ${
						index === activeIndex ? 'opacity-100' : 'hidden opacity-0'
					}`}
				>
					<div class="relative">
						<div class="absolute inset-0 flex items-center" aria-hidden="true">
							<div class="w-full border-t border-border"></div>
						</div>
						<div class="relative flex justify-center">
							<span class="bg-background px-3 text-2xl font-bold text-primary">
								{category.title}
							</span>
						</div>
					</div>
					<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{#each category.items as tool}
							<Card.Root class="transition-transform hover:scale-105">
								<Card.Header>
									<Card.Title class="text-card-foreground">{tool.name}</Card.Title>
									<Card.Description class="text-muted-foreground">
										{tool.description}
									</Card.Description>
								</Card.Header>
								<Card.Content>
									<Button
										href={tool.link}
										disabled={tool.link === ''}
										variant="outline"
										class="flex w-full items-center justify-center"
									>
										{#if tool.link !== ''}
											Try Now <ArrowRight class="ml-2 h-4 w-4" />
										{:else}
											Coming Soon <Clock class="ml-2 h-4 w-4" />
										{/if}
									</Button>
								</Card.Content>
							</Card.Root>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
