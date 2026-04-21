<script lang="ts">
	import '$styles/toolkit.scss';

	import { Carousel, Controls, CarouselIndicators } from 'flowbite-svelte';
	import { AtAGlance, Footer, Header, Project, Section } from '$widgets';
	import type { PageData } from './$types';
	import intro from '../intro.md?raw';
	import aboutMe from '../about_me.md?raw';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();

	const { projects, images } = $derived(data);

	let index = $state(0);
</script>

<svelte:head>
	<title>Quinten Lansu - Portfolio</title>
</svelte:head>

<Header></Header>

<Section content={intro}></Section>

<h1>At a glance</h1>
<AtAGlance></AtAGlance>

<h1>Recent Projects</h1>
<Carousel class="carousel" {images} bind:index duration={8000}>
	<Controls />
	{#snippet slide({ index })}
		<Project project={projects[index]}></Project>
	{/snippet}
	<CarouselIndicators class="carousel__indicators" />
</Carousel>

<h1>About Me</h1>
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

			&__indicators {
				position: absolute;
				top: 1rem;
				bottom: initial;
				gap: 1rem;
			}
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
