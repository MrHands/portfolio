<script lang="ts">
	import type { ITrailer } from '$lib';
	import { GetPreviewImage } from '$lib/helpers';

	interface Props {
		trailer: ITrailer;
		title: string;
		class?: string;
	}
	let { trailer, title, class: className = '' }: Props = $props();

	const link = $derived(trailer.link ?? '');

	function getClassNames(name: string) {
		const combined = ['m-trailer'];
		combined.push(name);

		return combined.join(' ');
	}
</script>

<div class={getClassNames(className)}>
	{#if link !== ''}
		<iframe
			class="m-trailer__item"
			src={`https://www.youtube.com/embed/${link.substring('yt://'.length)}`}
			{title}
			allowfullscreen={true}
			frameborder="0"
		></iframe>
	{/if}
	{#if link === ''}
		<img class="m-trailer__item" src={GetPreviewImage(trailer.image)} alt={title} />
	{/if}
</div>

<style lang="scss">
	@use '$styles/globals' as *;

	.m-trailer {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
		padding: 0 0 56.25%;
		overflow: hidden;

		&__item {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border: none;
		}
	}
</style>
