<script lang="ts">
	import { Email, SocialItem } from '$widgets';

	interface Props {
		class?: string;
	}
	let { class: className = '' }: Props = $props();

	function getClassNames(name: string) {
		const combined = ['o-footer'];
		combined.push(name);

		return combined.join(' ');
	}
</script>

<footer class={getClassNames(className)}>
	<h1 class="o-footer__header">Let's build something amazing together</h1>
	<p class="o-footer__text">
		Feel free to reach out to me if you have a question or just want to connect.
	</p>
	<ul class="o-footer__socials">
		<li>
			<Email email="quintenlansu@gmail.com"></Email>
		</li>
		<li>
			<SocialItem logo="linkedin" href="http://www.linkedin.com/profile/view?id=46334816"
			></SocialItem>
		</li>
	</ul>
</footer>

<style lang="scss">
	@use '$styles/globals' as *;

	.o-footer {
		display: flex;
		flex-direction: column;
		gap: 24px;
		padding: 24px 12vw;
		color: get-shade($clr-highlight, 100);
		background: get-shade($clr-highlight, 500);

		&__header {
			@include text-sans-serif('L');

			font-weight: bold;
			color: get-shade($clr-highlight, 100);
			text-align: left;
		}

		&__text {
			color: white;
		}

		&__socials {
			display: grid;
			grid-template-columns: repeat(3, min-content);
			column-gap: 12px;
			align-items: center;
			margin: 0;
			list-style: none;
		}
	}

	@include size-small {
		.o-footer {
			gap: 12px;
			padding: 12px;
		}
	}
</style>
