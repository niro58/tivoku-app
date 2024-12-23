<script module>
	const navItems = [{ name: 'Background Fill', href: '/background-fill' }];
</script>

<script lang="ts">
	import { page } from '$app/stores';

	import Button from '$lib/components/ui/button/button.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import { cn } from '$lib/utils';
	import { Menu } from 'lucide-svelte';

	let isOpen = $state(false);
</script>

<nav
	class="sticky top-0 z-40 w-full border-b border-border/40 bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 justify-center">
			<div class="hidden sm:ml-6 sm:flex sm:space-x-8">
				{#each navItems as item}
					<a
						href={item.href}
						class={cn(
							'inline-flex items-center px-1 pt-1 text-sm font-medium text-foreground hover:text-primary',
							$page.url.pathname === item.href && 'text-primary'
						)}
					>
						{item.name}
					</a>
				{/each}
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
							{#each navItems as item}
								<a
									href={item.href}
									class="text-base font-medium text-foreground hover:text-primary"
									onclick={() => (isOpen = false)}
								>
									{item.name}
								</a>
							{/each}
						</div>
					</Sheet.Content>
				</Sheet.Root>
			</div>
		</div>
	</div>
</nav>
