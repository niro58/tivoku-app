<script module>
</script>

<script lang="ts">
	import CircleDesignElement from '$lib/components/circle-design-element.svelte';
	import Seo from '$lib/components/seo.svelte';
	import { Ban } from 'lucide-svelte';

	const phrases = [
		'Oops! This site is off-limits. Time to focus! 🚀',
		'Nice try! But this page is blocked. Stay productive! 💪',
		'Blocked! How about a quick focus session instead? 🧠',
		'Distraction detected! Let’s get back on track. 🎯',
		'Access denied! But your productivity is approved. ✅',
		'Blocked! You’re one step closer to your goals. 🌟',
		'Focus mode activated! This site can wait. ⏳',
		'Blocked! But don’t worry, your future self will thank you. 😊',
		'Access restricted! Time to conquer your to-do list. 📝',
		'Blocked! Let’s turn this into a productivity win. 🏆'
	];

	const images = [
		'/website-blocker/01.webp',
		'/website-blocker/02.webp',
		'/website-blocker/03.webp',
		'/website-blocker/04.webp',
		'/website-blocker/05.webp'
	];
</script>

<Seo
	title="Access Blocked - Tivoku"
	description="Access to this page has been blocked. Time to focus and stay productive!"
	nofollow={true}
	noindex={true}
/>
<div
	class="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-background/50 to-background/50"
>
	<img
		src={images[Math.floor(Math.random() * images.length)]}
		alt="Blocked"
		class="absolute inset-0 -z-10 h-full w-full object-cover"
	/>
	<CircleDesignElement variation="4" />
	<div class="w-full max-w-md rounded-lg bg-card p-8 text-center shadow-lg">
		<span class="mb-4 flex items-center justify-center text-6xl text-primary">
			<Ban class="h-12 w-12" />
		</span>
		<h1 class="mb-4 text-3xl font-bold text-primary">Access Blocked</h1>
		<p class="text-neutral-foreground mb-6">
			{phrases[Math.floor(Math.random() * phrases.length)]}
		</p>
	</div>
</div>
