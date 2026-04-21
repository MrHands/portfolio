<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import { type TokensList } from 'marked';
	import { ImagePreview } from '$widgets';

	interface Props {
		content?: string | TokensList;
		class?: string;
	}
	let { content = '', class: className = '' }: Props = $props();
</script>

<section class={['m-section', className].join(' ')}>
	<SvelteMarkdown
		source={content}
		renderers={{
			image: ImagePreview
		}}
	></SvelteMarkdown>
</section>

<style lang="scss">
	@use '$styles/globals' as *;

	:global(.m-section) {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 0 auto;
	}

	:global(.m-section > p) {
		max-width: 70ch;
		margin: 0;
	}

	:global(.m-section > h3) {
		margin-top: 1rem;
	}

	@include size-small {
		:global(.m-section) {
			padding: 0 6vw;
		}
	}

	@include size-medium {
		:global(.m-section) {
			padding: 0 12vw;
		}
	}
</style>
