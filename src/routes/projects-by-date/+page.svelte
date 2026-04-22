<script lang="ts">
	import '$styles/toolkit.scss';
	import type { PageData } from './$types';
	import type { IBreadcrumb, IProject } from '$lib';
	import { Header, Footer, ProjectList } from '$widgets';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();

	function projectKey(value: string) {
		return value === 'Ongoing' ? new Date().getFullYear() + 1 : Number(value);
	}

	const projectList = $derived(data as Record<string, IProject[]>);
	const projectKeys = $derived(
		Object.keys(projectList).sort((left, right) => {
			return projectKey(left) < projectKey(right) ? 1 : -1;
		})
	);

	const breadcrumbs: IBreadcrumb[] = [
		{ url: '/', title: 'Home' },
		{ url: '/projects-by-date', title: 'Projects' }
	];
</script>

<svelte:head>
	<title>Quinten Lansu - Projects By Date</title>
</svelte:head>

<Header {breadcrumbs}></Header>

<section class="projects-by-date">
	{#each projectKeys as key (key)}
		<div class="projects-by-date__entry">
			{#if projectList[key].length > 0}
				<h2 class="projects-by-date__title">{key}</h2>
				<ProjectList class="projects-by-date__list" projects={projectList[key]}></ProjectList>
			{/if}
		</div>
	{/each}
</section>

<Footer></Footer>

<style lang="scss">
	@use '$styles/globals' as *;

	:global {
		.projects-by-date {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			padding: 0 2vw;

			&__entry {
				display: flex;
				flex-direction: column;
				gap: 0.25rem;
			}

			&__title {
				margin-bottom: 0.5rem;
				border-bottom: 1px solid get-shade($clr-highlight, 500);
			}

			&__list {
				display: flex;
				padding: 0 6vw;

				@include size-large {
					align-self: center;
					width: 70vw;
					padding: 0;
				}

				@include size-huge {
					align-self: center;
					width: 70vw;
					padding: 0;
				}
			}
		}
	}
</style>
