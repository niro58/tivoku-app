<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Footer from '$lib/components/footer.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	let { children } = $props();
</script>

<ModeWatcher />
<Toaster />
<Navbar />
{@render children()}
<Footer />
