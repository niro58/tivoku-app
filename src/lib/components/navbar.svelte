<script lang="ts">
	import { page } from '$app/stores';

	import Button from '$lib/components/ui/button/button.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import { cn } from '$lib/utils';
	import { Home, Menu } from 'lucide-svelte';
	import ThemeToggle from './theme-toggle.svelte';
	import { PAGES } from '$data/pages';
	let isOpen = $state(false);
</script>

{#snippet pageLinks()}
	{#each Object.values(PAGES) as item}
		{#if item.link != '/'}
			<a
				href={item.link}
				class={cn(
					'inline-flex items-center px-1 pt-1 text-sm font-medium text-foreground hover:text-primary',
					$page.url.pathname === item.link && 'text-primary'
				)}
			>
				{item.title}
			</a>
		{/if}
	{/each}
{/snippet}
<nav
	class="sticky top-0 z-40 w-full border-b border-border/40 bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 justify-center">
			<div class="relative hidden w-full items-center justify-center sm:flex">
				<div class="absolute left-0">
					<Button variant="outline" size="icon" href="/">
						<Home class="h-[1.2rem] w-[1.2rem]" />
					</Button>
				</div>
				{@render pageLinks()}

				<div class="absolute right-0">
					<ThemeToggle />
				</div>
			</div>
			<div class="flex items-center sm:hidden">
				<Sheet.Root open={isOpen} onOpenChange={(e) => (isOpen = e)}>
					<Sheet.Trigger>
						{#snippet child({ props })}
							<Button variant="ghost" size="icon" {...props}>
								<Menu class="h-6 w-6" />
								<span class="sr-only">Open main menu</span>
							</Button>
						{/snippet}
					</Sheet.Trigger>
					<Sheet.Content side="right" class="flex items-center">
						<div class="flex flex-col space-y-4">
							{@render pageLinks()}
						</div>
					</Sheet.Content>
				</Sheet.Root>
			</div>
		</div>
	</div>
</nav>
