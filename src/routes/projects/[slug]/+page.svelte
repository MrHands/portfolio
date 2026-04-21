<script lang="ts">
	import '$styles/toolkit.scss';

	import { marked } from 'marked';

	import { Section, Trailer, Footer, Header } from '$widgets';

	import type { PageData } from './$types';
	import type { IBreadcrumb, IProject } from '$lib';

	export let data: PageData;

	const project = data as unknown as IProject;

	const breadcrumbs: IBreadcrumb[] = [
		{ url: '/', title: 'Home' },
		{ url: '/projects-by-date', title: 'Projects' },
		{ url: `/projects/${project.id}`, title: project.title }
	];

	const tokens = marked.lexer(data.source);
	marked.walkTokens(tokens, (token) => {
		if (token.type == 'heading') {
			token.depth = 3;
		} else if (token.type == 'image') {
			token.href = `../media/screenshots/${token.href}`;
		}
	});
</script>

<svelte:head>
	<title>Quinten Lansu - {project.title}</title>
</svelte:head>

<Header {breadcrumbs}></Header>

<div class="o-project-trailer">
	<Trailer title={project.title} trailer={project.trailer}></Trailer>
</div>

<Section content={tokens}></Section>

<Footer></Footer>

<style lang="scss">
	@use '$styles/globals' as *;

	.o-project-trailer {
		padding: 0 12vw;
	}
</style>
