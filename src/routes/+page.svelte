<script lang="ts">
	import '$styles/toolkit.scss';

	import { AtAGlance, Footer, Header, Project, Section } from '$widgets';
	import type { PageData } from './$types';
	import intro from '../intro.md?raw';
	import aboutMe from '../about_me.md?raw';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
</script>

<svelte:head>
	<title>Quinten Lansu - Portfolio</title>
</svelte:head>

<Header></Header>

<Section content={intro}></Section>

<h1>At a glance</h1>
<AtAGlance></AtAGlance>

<h1>Projects</h1>
<div class="o-project-list">
	{#each data.projects as p (p.id)}
		<Project project={p}></Project>
	{/each}
</div>

<h1>About Me</h1>
<div class="m-section o-about-me">
	<div class="o-about-me__image"></div>
	<Section content={aboutMe} class="o-about-me__text"></Section>
</div>

<Footer></Footer>

<style lang="scss">
	@use '$styles/globals' as *;

	// Projects

	.o-project-list {
		box-sizing: border-box;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 48px;
		width: 100%;
		padding: 0 6vw;
		list-style: none;
	}

	@include size-small {
		.o-project-list {
			display: flex;
			flex-direction: column;
			gap: 2rem;
		}
	}

	@include size-medium {
		.o-project-list {
			gap: 60px 30px;
		}
	}

	// About me

	:global {
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
