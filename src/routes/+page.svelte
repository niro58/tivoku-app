<script>
	import Footer from '$lib/components/footer.svelte';
	import Seo from '$lib/components/seo.svelte';
	import ToolShowcase from '$lib/components/tool-showcase.svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import LogoIcon from '$lib/components/ui/svg/logo-icon.svelte';
</script>

<Seo
	title="Free Online Developer Toolkit - Simplify Your Everyday Tasks"
	description="Explore a free online toolkit featuring powerful tools for developers and creators. From image editing to text utilities, streamline your tasks with ease—no sign-ups required."
	keywords="free online developer tools, image editing tools, text utilities, developer productivity, online toolkit, no sign-ups tools, file conversion tools, free tools for creators"
	canonical="https://www.tivoku.com"
	themeColor="#D21E48"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Tivoku',
		url: 'https://www.tivoku.com',
		description:
			'Explore a free online toolkit featuring tools for developers and creators. Streamline your workflow with image editing, text utilities, and more—no sign-ups required.',
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
				width: 250,
				height: 250
			}
		},
		mainEntity: [
			{
				'@type': 'Question',
				name: 'I would like to have a specific online tool—can you create it?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: "Yes! If you need a specific online tool, feel free to contact me via email or Discord. I'm happy to consider your request and add it to Tivoku."
				}
			},
			{
				'@type': 'Question',
				name: 'Do I need to sign in or are there any limitations to using Tivoku?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'No, you don’t need to sign in to use Tivoku, and there are no limitations. All tools are fully accessible, free, and available without any sign-ups or restrictions.'
				}
			},
			{
				'@type': 'Question',
				name: "Is my data safe when using Tivoku's tools?",
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Yes, your data is completely safe. Tivoku doesn’t collect, process, or store your data on external servers. All tools run directly on your device.'
				}
			}
		]
	}}
/>
<div class="flex min-h-screen flex-col">
	<main class="flex-grow">
		<section class="bg-gradient-to-b from-background to-card py-16 md:py-24 lg:py-32">
			<div class="container px-4 md:px-6">
				<div class="flex flex-col items-center space-y-4 text-center">
					<div class="flex flex-col items-center space-y-2">
						<LogoIcon />
						<h1
							class="text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl lg:text-6xl/none"
						>
							<span>Free Online Developer Tools</span><br />
							<span>Simple Solutions for Everyday Tasks</span>
						</h1>

						<p class="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
							Welcome to my free online toolkit—a collection of practical tools for developers,
							creators, and anyone who wants to simplify everyday tasks. From image editing to text
							utilities, these tools are fast, accessible, and always free—without collecting or
							storing any of your data.
						</p>
					</div>
				</div>
			</div>
		</section>

		<section class="border-y border-border bg-card py-16">
			<div class="container px-4 md:px-6">
				<div class="grid gap-6 lg:grid-cols-3">
					<div class="space-y-2">
						<h2 class="text-2xl font-bold text-primary">A Growing Collection of Tools</h2>
						<p class="text-muted-foreground">
							Whether you're editing images, processing text, or converting files, this toolkit has
							you covered. Designed for developers and everyday users, it's an ever-expanding
							collection of free and practical utilities.
						</p>
					</div>
					<div class="space-y-2">
						<h2 class="text-2xl font-bold text-primary">Free and Easy to Use</h2>
						<p class="text-muted-foreground">
							All tools are completely free with no sign-ups, no restrictions, and no hidden fees.
							They run directly on your device, ensuring fast performance without relying on
							external servers or storing your data.
						</p>
					</div>
					<div class="space-y-2">
						<h2 class="text-2xl font-bold text-primary">Designed to Save Time</h2>
						<p class="text-muted-foreground">
							Streamline your workflow with tools that tackle everyday tasks quickly and
							efficiently. From small fixes to essential utilities, this toolkit is designed to make
							your work easier. New tools are added regularly, so check back often!
						</p>
					</div>
				</div>
			</div>
		</section>

		<ToolShowcase />
		<section class="py-16 md:py-24 lg:py-16">
			<div class="container px-4 md:px-6">
				<div class="relative">
					<div class="absolute inset-0 flex items-center" aria-hidden="true">
						<div class="w-full border-t border-border"></div>
					</div>
					<div class="relative flex justify-center">
						<span class="bg-background px-3 text-2xl font-bold text-primary">
							Frequently Asked Questions
						</span>
					</div>
				</div>
				<Accordion.Root type="single">
					<Accordion.Item value="new-tool-creation">
						<Accordion.Trigger
							>I would like to have an online tool—can you create it?</Accordion.Trigger
						>
						<Accordion.Content
							>Yes! If you need a specific online tool, feel free to contact me via email or
							Discord. I'm happy to consider your request and add it to Tivoku.</Accordion.Content
						>
					</Accordion.Item>
					<Accordion.Item value="limitations">
						<Accordion.Trigger
							>Do I need to sign in or are there any limitations to using Tivoku?</Accordion.Trigger
						>
						<Accordion.Content
							>No, you don’t need to sign in to use Tivoku, and there are no limitations. All tools
							are fully accessible, free, and available without any sign-ups or restrictions.</Accordion.Content
						>
					</Accordion.Item>
					<Accordion.Item value="privacy">
						<Accordion.Trigger>Is my data safe when using Tivoku's tools?</Accordion.Trigger>
						<Accordion.Content
							>Yes, your data is completely safe. Tivoku doesn’t collect, process, or store your
							data on external servers. All tools run directly on your device.</Accordion.Content
						>
					</Accordion.Item>
				</Accordion.Root>
			</div>
		</section>
	</main>
</div>
