<script lang="ts">
	import '$styles/toolkit.scss';

	import Carousel from 'flowbite-svelte/Carousel.svelte';
	import Controls from 'flowbite-svelte/Controls.svelte';
	import CarouselIndicators from 'flowbite-svelte/CarouselIndicators.svelte';

	import { resolve } from '$app/paths';
	import { AtAGlance, Footer, Header, Project, Section } from '$widgets';
	import intro from '$lib/intro.md?raw';
	import aboutMe from '$lib/about_me.md?raw';

	import type { PageData } from './$types';
	import { animate, type AnimationParams } from 'animejs';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();

	const { projects, images } = $derived(data);

	const portfolio = {
		url: 'https://qlansu.nl',
		title: "Quinten's Portfolio",
		description: 'Public portfolio for Quinten Lansu, a game developer and UI programmer',
		preview: 'https://qlansu.nl/og-preview.png'
	};

	let eleCarousel: HTMLElement | null = $state(null);
	let index = $state(0);
	let lastIndex = $state(0);
	const scrollDirection = $derived(index >= lastIndex ? 1 : -1);
	let scrollDuration = $state(8000);
	const useSlideTransition = false;
	let isAnimating = $state(false);

	const animeScroll = (node: HTMLElement, { direction = 1, duration = 600 }) => {
		const xOffset = 100 * direction;
		return {
			duration,
			tick: (t: number) => {
				if (t !== 0 && t !== 1) {
					return;
				}

				console.log('dir', direction);

				const params: AnimationParams = {
					easing: 'easeInQuart',
					duration,
					onComplete: () => {
						isAnimating = false;
						delete eleCarousel?.dataset.animating;
					}
				};

				if (direction === 1) {
					animate(node, {
						...params,
						translateX: [`${xOffset}%`, '0%'],
						opacity: [0, 1]
					});
				} else {
					animate(node, {
						...params,
						translateX: ['0%', `-${xOffset}%`],
						opacity: [1, 0]
					});
				}
			}
		};
	};

	const slideTransition = (node: HTMLElement, params: { direction: number }) => {
		if (!eleCarousel || eleCarousel.dataset.animating) {
			return {
				duration: 0,
				tick: () => {}
			};
		}

		isAnimating = true;
		eleCarousel.dataset.animating = 'true';

		console.log('index', index, 'last', lastIndex, 'dir', params.direction);
		const t = animeScroll(node, {
			direction: params.direction,
			duration: 700
		});
		lastIndex = index;
		return t;
	};
	const noneTransition = () => {
		return {
			duration: 0,
			tick: () => {}
		};
	};
	const transition = useSlideTransition ? slideTransition : noneTransition;
</script>

<svelte:head>
	<title>{portfolio.title}</title>

	<meta property="og:type" content="website" />
	<meta property="og:url" content={portfolio.url} />
	<meta property="og:title" content={portfolio.title} />
	<meta property="og:description" content={portfolio.description} />
	<meta property="og:image" content={portfolio.preview} />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content={portfolio.title} />
	<meta property="twitter:description" content={portfolio.description} />
	<meta property="twitter:image" content={portfolio.preview} />

	{#each images as image (image.src)}
		<link rel="preload" as="image" href={image.src} type="image/webp" />
	{/each}
</svelte:head>

<Header></Header>

<Section content={intro}></Section>

<h1>Projects I've worked on</h1>
<Carousel
	class="carousel"
	{images}
	bind:index
	duration={scrollDuration}
	transition={!useSlideTransition
		? (node) => transition(node, { direction: scrollDirection })
		: undefined}
>
	<Controls />
	<div class="carousel__viewport" bind:this={eleCarousel}>
		{#key index}
			<div class="carousel__slide" transition:transition={{ direction: scrollDirection }}>
				<Project project={projects[index]} noPreview={isAnimating} />
			</div>
		{/key}
		<div class="carousel__viewport__hide"></div>
	</div>
	<CarouselIndicators class="carousel__indicators" />
</Carousel>
<a class="projects-link" href={resolve('/projects-by-date')} title="All projects">
	<h3>All projects →</h3>
</a>

<h1>About Me</h1>
<AtAGlance></AtAGlance>
<div class="m-section o-about-me">
	<div class="o-about-me__image"></div>
	<Section content={aboutMe} class="o-about-me__text"></Section>
</div>

<Footer></Footer>

<style lang="scss">
	@use '$styles/globals' as *;

	:global {
		.carousel {
			height: 100%;
			aspect-ratio: 609/400;
			margin: 0 6vw;

			@include size-large {
				justify-self: center;
				width: 70vw;
				margin: 0;
			}

			@include size-huge {
				justify-self: center;
				width: 70vw;
				margin: 0;
			}

			& > img {
				display: none;
			}

			&:has([data-animating='true']) > img {
				$offset: 1rem;

				top: 0;
				left: $offset;
				z-index: 100;
				display: initial;
				width: calc(100% - #{$offset * 2});
				height: calc(100% - #{$offset * 2});
				border-radius: 1rem;
			}

			&__viewport {
				$this: &;

				position: relative;
				width: 100%;

				&__hide {
					position: absolute;
					inset: 0;
					z-index: 120;
					display: none;
					background: linear-gradient(
						transparent 0%,
						rgb(white, 0%) 40%,
						rgb(white, 70%) 75%,
						rgb(white, 100%) 100%
					);

					#{$this}[data-animating='true'] & {
						display: block;
					}
				}
			}

			&__slide {
				position: absolute;
				inset: 0;
			}

			&__indicators {
				position: absolute;
				top: 1rem;
				bottom: initial;
				gap: 1rem;

				> * {
					--spacing: min(0.5vw, 0.3rem);
				}
			}
		}

		.projects-link {
			margin: 0 auto;
		}

		.o-about-me {
			display: grid !important;
			grid-template-columns: 1fr 4fr;
			gap: 1rem;
			justify-content: center;

			&__image {
				aspect-ratio: 3 / 12;
				background: url('/media/images/quinten-and-lydia.webp');
				background-repeat: no-repeat;
				background-position-y: center;
				background-size: contain;
			}

			&__text {
				padding: 0 !important;
				margin: 0 !important;
			}
		}
	}
</style>
