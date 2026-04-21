<script lang="ts">
	interface Props {
		href?: string;
		title?: string;
		text?: string;
		class?: string;
	}
	let { href = '', title = '', text = '', class: className = '' }: Props = $props();

	let imageTitle = $derived(title.replace(/&quot;/g, '"'));

	interface IImageProperties {
		orientation: 'left' | 'right';
	}
	const properties: IImageProperties = $derived(
		imageTitle !== '' ? JSON.parse(imageTitle) : { orientation: 'left' }
	);

	function getClassNames(name: string) {
		const combined = ['a-image-preview'];
		combined.push(`a-image-preview--${properties.orientation}`);
		combined.push(name);

		return combined.join(' ');
	}
</script>

<div class={getClassNames(className)}>
	<img class="a-image-preview__image" src={href} title={text} alt={text} />
	<div class="a-image-preview__text">{text}</div>
</div>

<style lang="scss">
	@use '$styles/globals' as *;

	.a-image-preview {
		display: block;
		width: 100%;
		text-align: center;

		&__image {
			width: 100%;
		}

		&__text {
			@include text-size('s');
		}
	}
</style>
