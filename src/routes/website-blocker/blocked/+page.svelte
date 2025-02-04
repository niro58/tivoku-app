<script module>
</script>

<script lang="ts">
	import CircleDesignElement from '$lib/components/circle-design-element.svelte';

	import Button from '$lib/components/ui/button/button.svelte';

	import { Ban, Blocks } from 'lucide-svelte';
	import { Tween, tweened } from 'svelte/motion';

	let time = $state(25 * 60);
	let isActive = $state(false);

	$effect(() => {
		setInterval(() => {
			if (isActive) {
				time -= 1;
			}
		}, 1000);
	});

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	};
</script>

<div
	class="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-background/80"
>
	<CircleDesignElement variation="4" />
	<div class="w-full max-w-md rounded-lg bg-card p-8 text-center shadow-lg">
		<span class="mb-4 flex items-center justify-center text-6xl text-primary">
			<Ban class="h-12 w-12" />
		</span>
		<h1 class="mb-4 text-3xl font-bold text-primary">Access Blocked</h1>
		<p class="text-neutral-foreground mb-6">You have blocked the website</p>
		<div class="mb-6 text-5xl font-bold text-primary">{formatTime(time)}</div>
		<Button class="rounded-full" size="lg" onclick={() => (isActive = !isActive)}>
			{isActive ? 'Focus Time!' : 'Start Focus Timer'}
		</Button>
	</div>
</div>
