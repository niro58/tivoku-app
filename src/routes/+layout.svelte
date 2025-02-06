<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import { ModeWatcher, setMode } from 'mode-watcher';
	import '../app.css';
	import Footer from '$lib/components/footer.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { onMount } from 'svelte';
	let { children } = $props();
</script>

<ModeWatcher nonce="v/gm6v9Wp9HpPg8SAe1qMQ==" />
<Toaster />
<Navbar />
{@render children()}
<Footer />
