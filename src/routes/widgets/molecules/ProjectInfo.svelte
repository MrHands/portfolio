<script lang="ts">
	import type { IProject } from '$lib';

	interface IProps {
		class?: string;
		project: IProject;
	}
	let { class: className, project }: IProps = $props();

	let classList = $derived(() => {
		const resolved = ['m-project-info'];
		if (className) {
			resolved.push(className);
		}
		return resolved;
	});
</script>

<div class={classList().join(' ')}>
	<div class="m-project-info__company">{project.employer.name}</div>
	<div class="m-project-info__divider"></div>
	<div class="m-project-info__role">{project.brief.role}</div>
</div>

<style lang="scss">
	@use '$styles/globals' as *;

	:global {
		.m-project-info {
			&__divider {
				border-right: 1px solid gray;
			}

			&__company {
				@include text-paragraph('m');

				font-weight: normal;
				color: get-shade($clr-highlight, 400);
				text-transform: uppercase;
				overflow-wrap: break-word;

				@include size-small {
					@include text-size('s');
				}
			}

			&__role {
				@include text-size('m');

				color: get-shade($clr-highlight, 300);

				@include size-small {
					@include text-size('s');
				}
			}
		}
	}
</style>
