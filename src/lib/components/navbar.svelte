<script lang="ts">
	import { page } from '$app/stores';

	import Button from '$lib/components/ui/button/button.svelte';
	import { Menu } from 'lucide-svelte';
	import ThemeToggle from './theme-toggle.svelte';
	import { PAGES } from '$data/pages';
	import * as Card from './ui/card/index';
	import { fade, slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	let isOpen = $state(false);

	let hoveredIndex = $state<number | null>(null);
	let activeIndex = $state(0);
	let hoverStyle: {
		left?: string;
		width?: string;
	} = $state({});
	let activeStyle: {
		left: string;
		width: string;
	} = $state({ left: '0px', width: '0px' });

	let tabRefs = $state<HTMLAnchorElement[]>([]);

	$effect(() => {
		if (hoveredIndex !== null) {
			const hoveredElement = tabRefs[hoveredIndex];
			if (hoveredElement) {
				const { offsetLeft, offsetWidth } = hoveredElement;
				hoverStyle = {
					left: `${offsetLeft}px`,
					width: `${offsetWidth}px`
				};
			}
		}
	});
	$effect(() => {
		const activeElement = tabRefs[activeIndex];
		if (activeElement) {
			const { offsetLeft, offsetWidth } = activeElement;
			activeStyle = {
				left: `${offsetLeft}px`,
				width: `${offsetWidth}px`
			};
		}
	});

	$effect(() => {
		requestAnimationFrame(() => {
			const overviewElement = tabRefs[activeIndex];
			if (overviewElement) {
				const { offsetLeft, offsetWidth } = overviewElement;
				activeStyle = {
					left: `${offsetLeft}px`,
					width: `${offsetWidth}px`
				};
			}
		});
	});
	$effect(() => {
		const currentPage = Object.values(PAGES).find((item) => item.link === $page.route.id);
		if (currentPage) {
			activeIndex = Object.values(PAGES).indexOf(currentPage);
			const activeElement = tabRefs[activeIndex];
			if (activeElement) {
				const { offsetLeft, offsetWidth } = activeElement;
				activeStyle = {
					left: `${offsetLeft}px`,
					width: `${offsetWidth}px`
				};
			}
		}
	});
</script>

{#snippet pageLinks()}
	<div in:fade={{ duration: 300, delay: 200 }} class="gap-5 sm:flex sm:flex-row">
		{#each Object.values(PAGES) as item, index}
			<a
				bind:this={tabRefs[index]}
				class={`h-[30px] cursor-pointer px-3 py-2 transition-colors duration-300 ${
					index === activeIndex ? 'text-foreground' : 'text-foreground/50'
				}`}
				onmouseenter={() => (hoveredIndex = index)}
				onmouseleave={() => (hoveredIndex = null)}
				onclick={() => (activeIndex = index)}
				href={item.link}
			>
				<div
					transition:fade={{ duration: 300, delay: 10000 + 100 * index }}
					class="flex h-full items-center justify-center whitespace-nowrap text-sm font-[var(--www-mattmannucci-me-geist-regular-font-family)] leading-5"
				>
					{item.title}
				</div>
			</a>
		{/each}
	</div>
{/snippet}
<nav class="sticky top-0 z-40 w-full">
	<div class="flex h-16 justify-center">
		<Card.Root
			class="relative hidden h-[75px] w-full items-center justify-center rounded-t-none border-none shadow-none sm:flex"
		>
			<Card.Content class="p-0">
				<div class="relative">
					<div
						class="absolute flex h-[30px] items-center rounded-[6px] bg-foreground/10 transition-all duration-300 ease-out"
						style:left={hoverStyle.left ? hoverStyle.left : ''}
						style:width={hoverStyle.width ? hoverStyle.width : ''}
						style:opacity={hoveredIndex !== null ? 1 : 0}
					></div>

					<div
						class="absolute bottom-[-6px] h-[2px] bg-foreground transition-all duration-300 ease-out"
						style:left={activeStyle.left}
						style:width={activeStyle.width}
						in:fade={{ delay: 300, duration: 300 }}
					></div>

					<div class="relative flex items-center space-x-[6px]">
						{@render pageLinks()}
					</div>
				</div>
				<div class="absolute bottom-0 right-8 top-0 flex items-center">
					<ThemeToggle />
				</div>
			</Card.Content>
		</Card.Root>
		<div class="relative flex w-full items-center justify-between px-4 sm:hidden">
			<ThemeToggle />
			<Button variant="ghost" size="icon" onclick={() => (isOpen = !isOpen)}>
				<Menu class="h-6 w-6" />
				<span class="sr-only">Open main menu</span>
			</Button>
			<div class="h-10 w-10"></div>
			{#if isOpen}
				<div
					class="absolute left-0 top-16 w-full rounded-b-lg bg-background shadow-lg"
					in:slide={{ duration: 300 }}
					out:slide={{ duration: 300 }}
				>
					{@render pageLinks()}
				</div>
			{/if}
		</div>
	</div>
</nav>
