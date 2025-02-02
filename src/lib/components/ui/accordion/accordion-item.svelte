<script lang="ts">
	import { Accordion as AccordionPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: AccordionPrimitive.ItemProps = $props();
</script>

<AccordionPrimitive.Item
	bind:ref
	class={cn(
		'group rounded-xl border border-b border-foreground/10 bg-background/20 transition-all hover:border-primary/20',
		className
	)}
	{...restProps}
/>
