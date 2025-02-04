<script module>
	const features = [
		{
			title: 'Developer Tools',
			description:
				'Essential tools for developers: code formatting, validation, and transformation—all in one place.',
			icon: Code
		},
		{
			title: 'Design Resources',
			description:
				'Tools for designers: streamline your workflow with image editing, color palettes, and more.',
			icon: Palette
		},
		{
			title: 'Lightning Fast',
			description:
				'Lightning-fast tools with instant results and real-time previews—no waiting, no lag.',
			icon: Zap
		}
	];
	const features2 = [
		{
			title: 'Explore Our Ever-Growing Tool Library',
			description:
				'Discover a growing library of tools for image editing, file conversion, and more. Perfect for developers, designers, and everyday users. New tools added regularly!',
			icon: Library
		},
		{
			title: '100% Free, No Sign-Ups, No Hassle',
			description:
				'All tools are 100% free—no sign-ups, no restrictions, and no hidden fees. Everything runs directly in your browser for fast performance and total privacy.',
			icon: Lock
		},
		{
			title: 'Tools That Save You Time and Effort',
			description:
				'Save time with tools designed to simplify everyday tasks. From quick fixes to advanced utilities, we’ve got you covered. New tools added regularly!',
			icon: Zap
		}
	];
	const faqs = [
		{
			key: 'new-tool-creation',
			question: 'Can you build a custom tool for me?',
			answer:
				'Absolutely! We love building custom tools. Share your idea with us, and we’ll work together to make it happen.'
		},
		{
			key: 'no-sign-up',
			question: 'Do I need to sign in or are there any limitations to using Tivoku?',
			answer:
				'Nope! No sign-ins, no limits. All tools are free and ready to use right in your browser.'
		},
		{
			key: 'data-safety',
			question: "Is my data safe when using Tivoku's tools?",
			answer:
				'Your data stays safe—everything runs in your browser. We never store or share your files, so your privacy is always protected.'
		}
	];
</script>

<script>
	import CircleDesignElement from '$lib/components/circle-design-element.svelte';

	import FeatureCards from '$lib/components/feature-cards.svelte';
	import Seo from '$lib/components/seo.svelte';
	import ToolShowcase from '$lib/components/tool-showcase.svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import LogoIcon from '$lib/components/ui/svg/logo-icon.svelte';
	import { moveToSection } from '$lib/utils';
	import { ChevronRight, Code, Library, Lock, Palette, Zap } from 'lucide-svelte';
	import { fade, fly, slide } from 'svelte/transition';
</script>

<Seo
	title="Free Online Tools for Devs & Creators—Fast, Secure, No Sign-Up"
	description="Tivoku: Free, fast, secure online toolkit for developers. Edit images, convert files, process text—no sign-ups needed."
	keywords="free online tools, developer tools, designer tools, image converter, video converter, text utilities, file conversion tools, secure online tools, no sign-up tools, fast browser tools, free image editor, free video editor, client-side tools, privacy-focused tools"
	canonical="https://www.tivoku.com"
	themeColor="#D21E48"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Tivoku',
		url: 'https://www.tivoku.com',
		description:
			'Tivoku: Free, fast, secure online toolkit for developers. Edit images, convert files, process text—no sign-ups needed.',
		author: {
			'@type': 'Person',
			name: 'Niro58'
		},
		publisher: {
			'@type': 'Organization',
			name: 'Tivoku',
			logo: {
				'@type': 'ImageObject',
				url: 'https://www.tivoku.com/logo.png',
				width: 500,
				height: 281
			}
		},
		mainEntity: [
			{
				'@type': 'Question',
				name: 'Can you build a custom tool for me?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Absolutely! We love building custom tools. Share your idea with us, and we’ll work together to make it happen.'
				}
			},
			{
				'@type': 'Question',
				name: 'Do I need to sign in or are there any limitations to using Tivoku?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Nope! No sign-ins, no limits. All tools are free and ready to use right in your browser.'
				}
			},
			{
				'@type': 'Question',
				name: "Is my data safe when using Tivoku's tools?",
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Your data stays safe—everything runs in your browser. We never store or share your files, so your privacy is always protected.'
				}
			}
		]
	}}
/>

<div class="flex min-h-screen flex-col">
	<main class="flex-grow">
		<section
			id="home"
			class="relative overflow-hidden bg-gradient-to-b from-card to-background py-12 lg:py-32"
		>
			<CircleDesignElement variation="2" />

			<div class="container relative mx-auto py-16">
				<div class="grid gap-12 lg:grid-cols-2 lg:gap-8">
					<div in:fly={{ y: -20, duration: 600 }} class="flex flex-col justify-center">
						<div
							in:fade={{ delay: 200, duration: 600 }}
							class="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary"
						>
							<Zap size={14} class="animate-pulse" />
							Welcome to the future of development tools
						</div>

						<h1 in:fade={{ delay: 300, duration: 600 }} class="mb-6 text-5xl md:text-7xl">
							<LogoIcon />
						</h1>

						<h2
							in:fade={{ delay: 400, duration: 600 }}
							class="/90 mb-6 text-2xl font-medium md:text-3xl"
						>
							Free Online Tools for <br />
							<span class="text-primary">Developers, Designers, and Creators</span>
						</h2>

						<p
							in:fade={{ delay: 500, duration: 600 }}
							class="mb-8 max-w-lg text-base text-muted-foreground md:text-lg"
						>
							Your all-in-one toolkit for free, fast, and secure online tools. No sign-ups, no data
							storage—just powerful tools that work right in your browser.
						</p>

						<div in:fade={{ delay: 400, duration: 600 }} class="flex flex-wrap gap-4">
							<button
								onclick={(e) => {
									e.preventDefault();
									moveToSection(e, 'tools');
								}}
								class="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium transition-all hover:bg-primary/90"
							>
								Explore Tools
								<ChevronRight size={16} class="transition-transform group-hover:translate-x-0.5" />
							</button>
							<button
								onclick={(e) => {
									e.preventDefault();
									moveToSection(e, 'about');
								}}
								class="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-6 py-3 text-sm font-medium backdrop-blur-sm transition-all hover:bg-foreground/10"
							>
								Learn More
							</button>
						</div>
					</div>

					<div in:fade={{ delay: 400, duration: 800 }} class="relative grid gap-4 lg:grid-cols-2">
						{#each features as feature, index}
							<div
								in:fly={{ y: 20, delay: 500 + index * 100, duration: 600 }}
								class="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm transition-all hover:bg-foreground/10"
							>
								<div class="mb-3 inline-flex rounded-full bg-primary/10 p-3 text-primary">
									<feature.icon />
								</div>
								<h3 class="mb-2 text-lg font-semibold">{feature.title}</h3>
								<p class="text-sm text-muted-foreground">{feature.description}</p>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</section>

		<section class="container relative py-16 md:py-24" id="about">
			<CircleDesignElement variation="3" />

			<FeatureCards features={features2} />
		</section>
		<ToolShowcase />
		<section class="relative h-[50vh] min-h-[75vh] py-16 md:py-24 lg:pb-32 lg:pt-16" id="faq">
			<CircleDesignElement variation="2" />
			<div class="container px-4 md:px-6">
				<h2 class="mb-12 text-center text-3xl font-bold text-primary md:text-4xl">
					Frequently Asked Questions
				</h2>
				<Accordion.Root type="single" class="mx-auto max-w-3xl space-y-4">
					{#each faqs as { question, answer }}
						<Accordion.Item>
							<Accordion.Trigger>{question}</Accordion.Trigger>
							<Accordion.Content>
								{answer}
							</Accordion.Content>
						</Accordion.Item>
					{/each}
				</Accordion.Root>
			</div>
		</section>
	</main>
</div>
