<script lang="ts">
	import '$styles/toolkit.scss';

	import { marked } from 'marked';

	import { Section, Trailer, Footer, Header } from '$widgets';

	import type { PageData } from './$types';
	import type { IBreadcrumb, IProject } from '$lib';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const project = $derived(data as unknown as IProject);
	const source = $derived(data.source);

	const breadcrumbs: IBreadcrumb[] = $derived([
		{ url: '/', title: 'Home' },
		{ url: '/projects-by-date', title: 'Projects' },
		{ url: `/projects/${project.id}`, title: project.title }
	]);

	const tokens = $derived.by(() => {
		const lexerTokens = marked.lexer(source);
		marked.walkTokens(lexerTokens, (token) => {
			if (token.type == 'heading') {
				token.depth = 3;
			} else if (token.type == 'image') {
				token.href = `/media/screenshots/${token.href}`;
			}
		});
		return lexerTokens;
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
