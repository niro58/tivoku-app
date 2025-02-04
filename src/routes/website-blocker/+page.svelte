<script module>
	const faqs = [
		{
			question: 'How do I block a website?',
			answer:
				'You can add a domain manually or block the current page you’re on with just one click.',
			key: 'block-website'
		},
		{
			question: 'Can I schedule blocking times?',
			answer:
				'Yes! You can set specific times when certain websites should be blocked, perfect for focus sessions.',
			key: 'schedule-blocking'
		},
		{
			question: 'Does this extension work on all websites?',
			answer: 'Yes, you can block any website or specific pages within a domain.',
			key: 'all-websites'
		},
		{
			question: 'Is my data safe?',
			answer:
				'Absolutely! The extension works locally on your device—no data is collected or shared.',
			key: 'data-safety'
		},
		{
			question: 'Where can I download the extension?',
			answer:
				'You can download it from the <a href="https://github.com/your-repo" class="text-primary underline">Chrome extension repository</a>.',
			key: 'download-extension'
		},
		{
			question: 'How do I view the source code?',
			answer: `You can view the source code on the <a href="https://github.com/niro58/site-blocker-plugin" class="text-primary underline">Chrome extension repository</a>.`,
			key: 'source-code'
		}
	];
	const features = [
		{
			title: 'Block Specific Domains',
			icon: Lock
		},
		{
			title: 'Block Current Page',
			icon: Globe
		},
		{
			title: 'Schedule Blocking Times',
			icon: Clock
		},
		{
			title: 'Works Locally—No Data Shared',
			icon: Shield
		},
		{
			title: '100% Free—No Sign-Ups',
			icon: Gift
		},
		{
			title: 'Easy to Use & Customize',
			icon: Settings
		}
	];
</script>

<script>
	import CircleDesignElement from '$lib/components/circle-design-element.svelte';

	import Seo from '$lib/components/seo.svelte';
	import * as Accordion from '$lib/components/ui/accordion/index';
	import Button from '$lib/components/ui/button/button.svelte';
	import { moveToSection } from '$lib/utils';
	import { Lock, Globe, Clock, Shield, Gift, Settings, Check } from 'lucide-svelte';
	import { fly, scale } from 'svelte/transition';
</script>

<Seo
	title="Website Blocker Chrome Extension – Block Distractions & Boost Productivity"
	description="Block distracting websites with our Chrome extension. Add domains, block current pages, and schedule blocking times—all to help you stay focused and productive."
	keywords="website blocker chrome extension, block distracting websites, productivity tool, block websites, focus tool, chrome extension for blocking sites, schedule website blocking"
	canonical="https://www.tivoku.com/website-blocker"
	themeColor="#D21E48"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Website Blocker Chrome Extension – Block Distractions & Boost Focus',
		url: 'https://www.tivoku.com/website-blocker',
		description:
			'Block distracting websites with our Chrome extension. Add domains, block current pages, and schedule blocking times—all to help you stay focused and productive.',
		mainEntity: {
			'@type': 'WebApplication',
			name: 'Website Blocker Chrome Extension',
			url: 'https://www.tivoku.com/website-blocker',
			description:
				'A free Chrome extension to block distracting websites and boost productivity. Add domains, block current pages, and schedule blocking times.',
			applicationCategory: 'ProductivityTool',
			operatingSystem: 'Chrome',
			offers: {
				'@type': 'Offer',
				price: '0',
				priceCurrency: 'USD',
				category: 'Free Tool'
			},
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
			}
		},
		'@graph': [
			{
				'@type': 'FAQPage',
				mainEntity: [
					{
						'@type': 'Question',
						name: 'How do I block a website?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'You can add a domain manually or block the current page you’re on with just one click.'
						}
					},
					{
						'@type': 'Question',
						name: 'Can I schedule blocking times?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'Yes! You can set specific times when certain websites should be blocked, perfect for focus sessions.'
						}
					},
					{
						'@type': 'Question',
						name: 'Does this extension work on all websites?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'Yes, you can block any website or specific pages within a domain.'
						}
					},
					{
						'@type': 'Question',
						name: 'Is my data safe?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'Absolutely! The extension works locally on your device—no data is collected or shared.'
						}
					},
					{
						'@type': 'Question',
						name: 'Where can I download the extension?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'You can download it from the <a href="#" class="text-primary underline">Chrome Web Store</a>.'
						}
					},
					{
						'@type': 'Question',
						name: 'How do I view the source code?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'You can view the source code on the <a href="https://github.com/niro58/site-blocker-plugin" class="text-primary underline">Chrome extension repository</a>.'
						}
					}
				]
			}
		]
	}}
/>
<div class="mx-auto bg-gradient-to-b from-background to-background/80 px-4 pb-16">
	<div class="container flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
		<div class="w-full max-w-7xl space-y-8">
			<CircleDesignElement variation="2" />
			<div in:fly={{ y: 20, duration: 800 }} class="text-center">
				<h1
					class="mb-4 flex flex-col text-start text-5xl font-extrabold sm:flex-row sm:items-center sm:justify-center sm:text-6xl md:text-7xl"
				>
					<div>Block<span class="text-primary">.</span></div>
					<div>Focus<span class="text-primary">.</span></div>
					<div>
						Conquer<span class="text-primary">.</span>
					</div>
				</h1>
				<p class="text-neutral-foreground mb-8 text-xl sm:text-2xl">
					Unleash your productivity with our FocusGuard.
				</p>
			</div>

			<div in:scale={{ start: 0.8, duration: 800, delay: 200 }} class="relative">
				<div class="absolute inset-0 rounded-3xl bg-black opacity-50"></div>
				<div class="relative overflow-hidden rounded-3xl bg-gray-900 shadow-2xl">
					<div
						class="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-primary via-yellow-500 to-green-500"
					></div>
					<div class="p-6 sm:p-10">
						<div class="mb-6 flex items-center justify-between">
							<div class="flex space-x-2">
								<div class="h-3 w-3 rounded-full bg-primary"></div>
								<div class="h-3 w-3 rounded-full bg-yellow-500"></div>
								<div class="h-3 w-3 rounded-full bg-green-500"></div>
							</div>
							<div class="text-neutral-foreground text-sm">Block.Focus.Conquer</div>
						</div>
						<div class="space-y-4">
							<div class="h-4 w-3/4 rounded bg-gray-700"></div>
							<div class="h-4 rounded bg-gray-700"></div>
							<div class="h-4 w-5/6 rounded bg-gray-700"></div>
							<div class="h-4 w-1/2 rounded bg-gray-700"></div>
						</div>
					</div>
				</div>
			</div>

			<div
				in:fly={{ y: 20, duration: 800, delay: 400 }}
				class="flex flex-col justify-center gap-3 sm:flex-row"
			>
				<Button variant="default" disabled={true} class="rounded-full" size="lg"
					>Download Extension</Button
				>
				<Button
					variant="outline"
					onclick={(e) => {
						moveToSection(e, 'about');
					}}
					size="lg"
					class="rounded-full px-8 py-3"
				>
					Learn More</Button
				>
			</div>
			<div class="flex items-center justify-center">
				<p
					class="rounded-xl border-2 border-primary bg-primary-foreground p-2 px-5 text-sm font-bold text-primary"
				>
					Waiting for the extension to be published on the Chrome Web Store. Stay tuned!
				</p>
			</div>
		</div>
	</div>
	<section class="relative py-16">
		<CircleDesignElement variation="4" />

		<div class="relative mx-auto">
			<div class="mx-auto max-w-6xl">
				<div class="grid gap-12 md:grid-cols-2">
					<div class="space-y-8">
						<h2 class="text-3xl font-bold md:text-4xl">Block Distractions & Boost Productivity</h2>

						<p class="text-neutral-foreground text-lg leading-relaxed">
							Our Chrome extension helps you stay focused by blocking distracting websites. Add
							domains, block current pages, and schedule blocking times—all to help you achieve your
							goals.
						</p>
					</div>

					<div class="grid gap-6">
						{#each [{ title: 'Block Specific Domains', description: 'Add websites to your blocklist with just a few clicks.', icon: Lock }, { title: 'Block Current Page', description: 'Instantly block the page you’re on to avoid distractions.', icon: Globe }, { title: 'Schedule Blocking Times', description: 'Set specific times when websites should be blocked.', icon: Clock }] as feature}
							<div class="/10 flex gap-6 rounded-xl border bg-white/5 p-6 backdrop-blur-sm">
								<div class="h-12 rounded-lg bg-primary/10 p-3 text-primary">
									<feature.icon class="h-6 w-6" />
								</div>
								<div>
									<h3 class="mb-2 font-semibold">{feature.title}</h3>
									<p class="text-neutral-foreground text-sm">{feature.description}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="relative py-16">
		<CircleDesignElement variation="4" />

		<div class="relative mx-auto" id="about">
			<div class="mx-auto max-w-4xl">
				<h2 class="mb-12 text-center text-3xl font-bold md:text-4xl">
					Why Choose Our Website Blocker?
				</h2>

				<div class="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each features as feature}
						<div
							class="flex items-start gap-4 rounded-xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm"
						>
							<div class="rounded-lg bg-primary/10 p-2 text-primary">
								<Check class="h-5 w-5" />
							</div>
							<div>
								<h3 class="font-medium">{feature.title}</h3>
							</div>
						</div>
					{/each}
				</div>
				<div
					class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary p-8 md:p-12"
				>
					<div
						class="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:5rem_5rem] opacity-10"
					></div>

					<div
						class="relative flex flex-col items-center gap-6 text-center md:flex-row md:text-left"
					>
						<div class="rounded-full bg-white/10 p-4">
							<Shield class="h-8 w-8" />
						</div>
						<div>
							<h3 class="mb-2 text-xl font-semibold md:text-2xl">Your Privacy Matters</h3>
							<p class="/90">
								All blocking happens locally on your device—no data is collected or shared. Your
								browsing stays private and secure.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="relative py-16 md:py-24 lg:pb-32 lg:pt-16" id="faq">
		<div class="container px-4 md:px-6">
			<h2 class="mb-12 text-center text-3xl font-bold text-primary md:text-4xl">
				Frequently Asked Questions
			</h2>
			<Accordion.Root type="single" class="mx-auto max-w-3xl space-y-4">
				{#each faqs as { question, answer, key }}
					<Accordion.Item value={key}>
						<Accordion.Trigger>{question}</Accordion.Trigger>
						<Accordion.Content>
							{@html answer}
						</Accordion.Content>
					</Accordion.Item>
				{/each}
			</Accordion.Root>
		</div>
	</section>
</div>
