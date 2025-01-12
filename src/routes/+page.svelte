<script>
	import Footer from '$lib/components/footer.svelte';
	import ToolShowcase from '$lib/components/tool-showcase.svelte';
</script>

<div class="flex min-h-screen flex-col">
	<main class="flex-grow">
		<section class="bg-gradient-to-b from-background to-card py-16 md:py-24 lg:py-32">
			<div class="container px-4 md:px-6">
				<div class="flex flex-col items-center space-y-4 text-center">
					<div class="space-y-2">
						<h1
							class="text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl lg:text-6xl/none"
						>
							My personal made little toolkit
						</h1>
						<p class="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
							Got tired of searching for the right tool each time when needed so i kind of build if i need one, just everything in one place :P. Will slowly add more if needed, if you need one personally contact me on discord or mail
						</p>
					</div>
				</div>
			</div>
		</section>

		<section class="border-y border-border bg-card py-16">
			<div class="container px-4 md:px-6">
				<div class="grid gap-6 lg:grid-cols-3">
					<div class="space-y-2">
						<h2 class="text-2xl font-bold text-primary">Diverse Tools</h2>
						<p class="text-muted-foreground">
							From image manipulation to text processing, from developer utilities to everyday
							helpers, ToolKit offers a diverse range of functionalities all in one place.
						</p>
					</div>
					<div class="space-y-2">
						<h2 class="text-2xl font-bold text-primary">Simple & Accessible</h2>
						<p class="text-muted-foreground">
							What sets ToolKit apart is its simplicity and accessibility. All tools are free to
							use, with no sign-up required. They're designed to be intuitive, fast, and effective.
						</p>
					</div>
					<div class="space-y-2">
						<h2 class="text-2xl font-bold text-primary">Solve Real Problems</h2>
						<p class="text-muted-foreground">
							Whether you're resizing images, formatting JSON, generating passwords, or converting
							units, ToolKit has got you covered. Explore our growing collection of tools and
							simplify your workflow today!
						</p>
					</div>
				</div>
			</div>
		</section>

		<ToolShowcase />
	</main>
	<Footer />
</div>
