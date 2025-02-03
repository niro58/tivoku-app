<script lang="ts">
	interface Props {
		labelElement: HTMLLabelElement;
		hex: string | undefined;
		label: string;
		name?: string | undefined;
		isOpen: boolean;
	}

	let { labelElement = $bindable(), hex, label, name = undefined, isOpen }: Props = $props();
</script>

<label
	bind:this={labelElement}
	onclick={(e) => e.preventDefault()}
	onmousedown={(e) => e.preventDefault()}
>
	<div class="container">
		<input
			type="color"
			{name}
			value={hex}
			onclick={(e) => e.preventDefault()}
			onmousedown={(e) => e.preventDefault()}
			aria-haspopup="dialog"
		/>
		<div class="alpha"></div>
		<div class="color" style:background={hex}></div>
	</div>
	{label}
</label>

<style>
	label {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
		border-radius: 3px;
		margin: 4px;
		height: var(--input-size, 25px);
		user-select: none;
	}

	.container {
		position: relative;
		display: block;
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--input-size, 25px);
	}

	input {
		margin: 0;
		padding: 0;
		border: none;
		width: 1px;
		height: 1px;
		flex-shrink: 0;
		opacity: 0;
	}

	.alpha {
		clip-path: circle(50%);
		background: var(--alpha-grid-bg);
	}

	.alpha,
	.color {
		position: absolute;
		width: var(--input-size, 25px);
		height: var(--input-size, 25px);
		border-radius: 50%;
		user-select: none;
	}

	input:focus-visible ~ .color {
		outline: 2px solid var(--focus-color, red);
		outline-offset: 2px;
	}
</style>
