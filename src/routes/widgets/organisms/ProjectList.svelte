<script lang="ts">
	import type { IProject } from '$lib';
	import { Project } from '$widgets';

	interface IProps {
		class?: string;
		projects: IProject[];
	}
	let { class: className, projects = [] }: IProps = $props();

	let classList = $derived(() => {
		const resolved = ['o-project-list'];
		if (className) {
			resolved.push(className);
		}
		return resolved;
	});
</script>

<div class={classList().join(' ')}>
	{#each projects as p (p.id)}
		<Project project={p}></Project>
	{/each}
</div>

<style lang="scss">
	@use '$styles/globals' as *;

	:global {
		.o-project-list {
			box-sizing: border-box;
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 48px;
			width: 100%;
			padding: 0 6vw;
			list-style: none;

			@include size-small {
				display: flex;
				flex-direction: column;
				gap: 2rem;
			}

			@include size-medium {
				display: flex;
				flex-direction: column;
				gap: 2rem;
			}
		}
	}
</style>
