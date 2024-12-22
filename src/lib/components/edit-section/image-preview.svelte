<script lang="ts">
	import { selectedImageStore } from '$lib/stores';
	import { onMount } from 'svelte';

	let cvRef = $state<HTMLCanvasElement | null>(null);
	let ctx = $state<CanvasRenderingContext2D | null>(null);
	onMount(() => {
		if (cvRef) {
			ctx = cvRef.getContext('2d');
		}
	});
	$effect(() => {
		clearCanvas();
		addImageToCanvas($selectedImageStore.src);
	});
	function addImageToCanvas(src: string) {
		if (!ctx || !cvRef) return;
		const img = new Image();
		img.src = src;
		img.onload = () => {
			if (!ctx || !cvRef) return;

			var hRatio = cvRef.width / img.width;
			var vRatio = cvRef.height / img.height;
			var ratio = Math.min(hRatio, vRatio);
			var centerShift_x = (cvRef.width - img.width * ratio) / 2;
			var centerShift_y = (cvRef.height - img.height * ratio) / 2;
			ctx.clearRect(0, 0, cvRef.width, cvRef.height);
			console.log(centerShift_x, centerShift_y, img.height, img.width, cvRef.height, cvRef.height);
			ctx.drawImage(
				img,
				0,
				0,
				img.width,
				img.height,
				centerShift_x,
				centerShift_y,
				img.width * ratio,
				img.height * ratio
			);
		};
	}
	function clearCanvas() {
		if (!ctx || !cvRef) return;
		ctx.clearRect(0, 0, cvRef.width, cvRef.height);
	}
</script>

<div class="relative flex h-full w-full overflow-hidden">
	<!-- <img
		src={$selectedImageStore.src}
		alt={$selectedImageStore.alt}
		class="mx-auto object-contain transition-all duration-300 ease-in-out"
		style={`transform:scale(${$selectedImageStore.crop.zoom / 100})`}
	/> -->
	<canvas width="full" height="full" bind:this={cvRef}> </canvas>
</div>
