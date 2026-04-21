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
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
			width: 100%;
			padding: 0 6vw;
			list-style: none;
		}
	}
</style>
