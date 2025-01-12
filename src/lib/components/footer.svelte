<script>
	import { Github, Mail, MessageCircle } from 'lucide-svelte';
</script>

<footer class="border-t border-border bg-card py-8">
	<div class="container px-4 md:px-6">
		<div class="grid gap-8 md:grid-cols-2">
			<div class="space-y-4">
				<h3 class="text-lg font-semibold text-primary">About ToolKit</h3>
				<p class="text-sm text-muted-foreground">
					Built by developers, for everyone. Use our tools for free, no strings attached.
				</p>
				<p class="text-sm text-muted-foreground">
					© {new Date().getFullYear()} ToolKit. All rights reserved.
				</p>
			</div>
			<div class="space-y-4">
				<h3 class="text-lg font-semibold text-primary">Contact Us</h3>
				<ul class="space-y-2">
					<li>
						<MessageCircle class="mr-2 h-5 w-5" />
						Discord Nickname : Niro58
					</li>
					<li>
						<a
							href="mailto:niro@tivoku.com"
							class="flex items-center text-sm text-muted-foreground hover:text-primary"
						>
							<Mail class="mr-2 h-5 w-5" />
							niro@tivoku.com
						</a>
					</li>
					<li>
						<a
							href="https://github.com/yourusername"
							class="flex items-center text-sm text-muted-foreground hover:text-primary"
						>
							<Github class="mr-2 h-5 w-5" />
							https://github.com/niro58
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</footer>
