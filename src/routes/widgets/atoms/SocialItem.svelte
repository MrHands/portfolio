<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve */

	interface Props {
		logo?: 'twitter' | 'linkedin';
		href?: string;
		class?: string;
	}
	let { logo = 'linkedin', href = '', class: className = '' }: Props = $props();

	function getClassNames(name: string) {
		const combined = ['a-social-item'];
		combined.push(`a-social-item--${logo}`);
		combined.push(name);

		return combined.join(' ');
	}
</script>

<a class={getClassNames(className)} {href} target="_blank" title={logo}>
	<div class="a-social-item__logo"></div>
</a>
<div class={getClassNames(className)}></div>

<style lang="scss">
	@use '$styles/globals' as *;

	.a-social-item {
		$this: &;

		&__logo {
			display: block;
			width: 32px;
			height: 32px;
			background-color: get-shade($clr-highlight, 700);
			background-image: url('/media/images/social.png');
			background-repeat: no-repeat;
			background-clip: padding-box;
			border-radius: 16px;

			#{$this}--twitter & {
				background-position: -32px 0;

				&:hover {
					background-color: #5ec3df;
				}
			}

			#{$this}--linkedin & {
				background-position: -192px 0;

				&:hover {
					background-color: #2089b5;
				}
			}
		}
	}
</style>
