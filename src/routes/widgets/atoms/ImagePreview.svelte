<script lang="ts">
	export let href = '';
	export let title = '';
	export let text = '';

	let imageTitle = title.replace(/&quot;/g, '"');

	interface IImageProperties {
		orientation: 'left' | 'right';
	}
	const properties: IImageProperties =
		imageTitle !== '' ? JSON.parse(imageTitle) : { orientation: 'left' };

	function getClassNames(name: string) {
		const combined = ['a-image-preview'];
		combined.push(`a-image-preview--${properties.orientation}`);
		combined.push(name);

		return combined.join(' ');
	}

	let className = '';
	export { className as class };
</script>

<div class={getClassNames(className)}>
	<img class="a-image-preview__image" src={href} title={text} alt={text} />
	<div class="a-image-preview__text">{text}</div>
</div>

<style lang="scss">
	@import '$styles/globals';

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
