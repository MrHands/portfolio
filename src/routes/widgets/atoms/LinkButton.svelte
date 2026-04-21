<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve */

	interface Props {
		text: string;
		url: string;
		class?: string;
	}

	let { text, url, class: className = '' }: Props = $props();
</script>

<a class={['a-button', className].join(' ')} href={url}>
	{text}
</a>

<style lang="scss">
	@use '$styles/globals' as *;

	.a-button {
		@include text-header('M');

		padding: 12px;
		color: white;
		text-align: center;
		text-decoration: none;
		background: get-shade($clr-highlight, 500);
		border: 1px solid transparent;

		&--secondary {
			color: get-shade($clr-highlight, 500);
			background: none;
			border-color: get-shade($clr-highlight, 500);
		}

		&:hover {
			color: white;
			text-decoration: none;
			background: get-shade($clr-highlight, 300);
			border-color: transparent;
		}
	}

	@include size-small {
		.a-button {
			@include text-size('S');
		}
	}

	@include size-medium {
		.a-button {
			@include text-size('S');
		}
	}
</style>
