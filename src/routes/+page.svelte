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
	import { animate } from 'animejs';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();

	const { projects, images } = $derived(data);

	let index = $state(0);
	let lastIndex = $derived(index);
	const scrollDirection = $derived(index >= lastIndex ? 1 : -1);

	let scrollDuration = $state(8000);
	const animeScroll = (node: HTMLElement, { direction = 1, duration = 600 }) => {
		const xOffset = 100 * direction;
		console.log(xOffset);
		return {
			duration,
			tick: (t: number, u: number) => {
				if (t === 0 && !node.dataset.animating) {
					node.dataset.animating = 'true';
					animate(node, {
						translateX: [`${xOffset}%`, '0%'],
						opacity: [0, 1],
						easing: 'easeOutQuart',
						duration: duration,
						onComplete: () => delete node.dataset.animating
					});
				} else if (u === 1 && !node.dataset.animating) {
					node.dataset.animating = 'true';
					animate(node, {
						translateX: ['0%', `-${xOffset}%`],
						opacity: [1, 0],
						easing: 'easeOutQuart',
						duration: duration,
						onComplete: () => delete node.dataset.animating
					});
				}
			}
		};
	};
	const transition = (node: HTMLElement, params: { direction: number }) => {
		console.log('index', index, 'last', lastIndex, 'dir', params.direction);
		const t = animeScroll(node, {
			direction: params.direction,
			duration: 700
		});
		lastIndex = index;
		return t;
	};
</script>

<svelte:head>
	<title>Quinten Lansu - Portfolio</title>
	{#each images as image (image.src)}
		<link rel="preload" as="image" href={image.src} type="image/webp" />
	{/each}
</svelte:head>

<Header></Header>

<Section content={intro}></Section>

<h1>Projects I've worked on</h1>
<Carousel class="carousel" {images} bind:index duration={scrollDuration}>
	<Controls />
	<div class="carousel__viewport">
		{#key index}
			<div class="carousel__slide" transition:transition={{ direction: scrollDirection }}>
				<Project project={projects[index]} />
			</div>
		{/key}
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
			margin: 0 6vw;
			overflow: initial;

			&__viewport {
				position: relative;
				width: 100%;
				aspect-ratio: 16/9;
				overflow: hidden;
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
