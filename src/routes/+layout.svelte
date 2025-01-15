<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Footer from '$lib/components/footer.svelte';
	let { children } = $props();
</script>
<ModeWatcher />
<Navbar />
{@render children()}
<Footer />