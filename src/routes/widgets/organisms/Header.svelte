<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve */

	import type { IBreadcrumb } from '$lib';

	interface IProps {
		breadcrumbs?: IBreadcrumb[];
		class?: string;
	}
	let { breadcrumbs = [], class: className }: IProps = $props();

	const breadcrumbsBefore = $derived(breadcrumbs.length > 1 ? breadcrumbs.slice(0, -1) : []);
	const breadcrumbLast = $derived(
		breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1] : { url: '', title: '' }
	);

	const words = $state(['user interfaces', 'games', 'experiences']);

	let classList = $derived(() => {
		const resolved = ['o-home-header'];
		if (className) {
			resolved.push(className);
		}
		if (breadcrumbs.length > 0) {
			resolved.push('o-home-header--breadcrumbs');
		}
		return resolved;
	});
</script>

<header class={classList().join(' ')}>
	<div class="o-home-header__container">
		<div class="o-home-header__headshot"></div>
		{#if breadcrumbs.length === 0}
			<div class="o-home-header__intro">
				<p>Hello there!</p>
				<p>My name is <em>Quinten Lansu</em></p>
				<p>
					and I build <span class="o-home-header__words">
						{#each words as w (w)}
							<em>{w}</em>
						{/each}
					</span>
				</p>
			</div>
		{:else}
			<div class="o-home-header__breadcrumbs">
				{#each breadcrumbsBefore as b (b.url)}
					<a class="o-home-header__breadcrumbs__item" href={b.url}>{b.title}</a>
					<div class="o-home-header__breadcrumbs__item">/</div>
				{/each}
			</div>
			<h2 class="o-home-header__title">{breadcrumbLast.title}</h2>
		{/if}
	</div>
</header>

<style lang="scss">
	@use '$styles/globals' as *;

	.o-home-header {
		$this: &;

		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 240px;
		padding: 12px;
		color: white;
		background: get-shade($clr-highlight, 500);

		&--breadcrumbs {
			justify-content: flex-start;
			min-height: auto;
			padding: 12px 12vw;
		}

		&__container {
			display: grid;
			grid-template-areas: 'face  intro';
			grid-template-columns: 1fr 4fr;
			column-gap: 24px;
			align-items: center;

			#{$this}--breadcrumbs & {
				grid-template-areas:
					'face  breadcrumbs  '
					'face  title        ';
				grid-template-columns: min-content 1fr;
			}
		}

		&__title {
			grid-area: title;
			color: white;
		}

		&__headshot {
			display: table;
			grid-area: face;
			width: 120px;
			height: 120px;
			margin: 5px;
			background: url('/media/images/profile.jpg') center/contain no-repeat;
			border: 4px solid white;
			border-radius: 50%;

			#{$this}--breadcrumbs & {
				width: 60px;
				height: 60px;
			}
		}

		&__breadcrumbs {
			display: grid;
			grid-area: breadcrumbs;
			grid-template-columns: repeat(4, min-content);
			column-gap: 12px;
			list-style: none;

			&__item {
				color: get-shade($clr-highlight, 300);
				text-transform: uppercase;
			}
		}

		&__intro {
			grid-area: intro;

			p {
				@include text-sans-serif('XL');

				line-height: initial;
				color: white;
			}

			em {
				font-style: normal;
				font-weight: bold;
			}
		}

		&__words {
			display: inline-flex;
			flex-direction: column;
			max-height: 1.25em;
			overflow: hidden;
		}
	}

	@include size-small {
		.o-home-header {
			$this: &;

			&--breadcrumbs {
				justify-content: center;
			}

			&__container {
				grid-template-areas:
					'face         '
					'intro        ';
				grid-template-rows: 1fr min-content;
				grid-template-columns: 1fr;
				row-gap: 12px;
				justify-items: center;
				padding: 12px;

				#{$this}--breadcrumbs & {
					grid-template-areas:
						'face         '
						'breadcrumbs  '
						'title        ';
					grid-template-rows: 1fr min-content min-content;
					grid-template-columns: 1fr;
					row-gap: 12px;
					justify-items: center;
					padding: 12px;
				}
			}

			&__intro {
				p {
					@include text-sans-serif('L');
				}
			}
		}
	}

	@include size-medium {
		.o-home-header {
			$this: &;

			&__container {
				grid-template-columns: 1fr 2fr;

				#{$this}--breadcrumbs & {
					align-content: center;
				}
			}

			&__intro {
				p {
					@include text-sans-serif('L');
				}
			}
		}
	}
</style>
