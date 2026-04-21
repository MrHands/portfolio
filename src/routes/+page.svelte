<script lang="ts">
	import '$styles/toolkit.scss';

	import { Carousel, Controls, CarouselIndicators } from 'flowbite-svelte';

	import { resolve } from '$app/paths';
	import { AtAGlance, Footer, Header, Project, Section } from '$widgets';
	import intro from '$lib/intro.md?raw';
	import aboutMe from '$lib/about_me.md?raw';

	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();

	const { projects, images } = $derived(data);

	let duration = $state(8000);
	let index = $state(0);
</script>

<svelte:head>
	<title>Quinten Lansu - Portfolio</title>
</svelte:head>

<Header></Header>

<Section content={intro}></Section>

<h1>Projects I've worked on</h1>
<Carousel class="carousel" {images} bind:index {duration}>
	<Controls />
	{#snippet slide({ index })}
		<Project project={projects[index]}></Project>
	{/snippet}
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
