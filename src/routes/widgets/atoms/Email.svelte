<script lang="ts">
	/* eslint-disable svelte/no-at-html-tags */

	interface Props {
		email: string;
		class?: string;
	}
	let { email, class: className = '' }: Props = $props();

	function getClassNames(name: string) {
		const combined = ['a-email'];
		combined.push(name);

		return combined.join(' ');
	}
</script>

<a href={`mailto:${email}`} class={getClassNames(className)}>
	{@html email}
</a>

<style lang="scss">
	@use '$styles/globals' as *;

	.a-email {
		@include text-size('M');

		padding: 8px 12px;
		color: get-shade($clr-highlight, 100);
		text-decoration: none;
		background: get-shade($clr-highlight, 700);
		border-radius: 8px;

		&:hover {
			background: get-shade($clr-highlight, 300);
		}
	}

	@include size-small {
		.a-email {
			@include text-size('S');
		}
	}
</style>
