<script lang="ts">
	import { resolve } from '$app/paths';
	import { type IProject } from '$lib';
	import { ProjectInfo } from '$widgets';
	import { LockSolid } from 'flowbite-svelte-icons';

	interface Props {
		project: IProject;
		class?: string;
	}
	let { project, class: className = '' }: Props = $props();

	const trailerImage = $derived(`./media/previews/${project.trailer.image}`);
	const isLocked = $derived(project.locked ?? false);

	let classList = $derived(() => {
		const resolved = ['o-project'];
		if (className) {
			resolved.push(className);
		}
		if (isLocked) {
			resolved.push('o-project--locked');
		}
		return resolved;
	});
</script>

{#if isLocked}
	<div class={classList().join(' ')}>
		<div class="o-project__preview"></div>
		<div class="o-project__locked">
			<LockSolid class="o-project__locked__icon"></LockSolid>
			<h2>Project under NDA</h2>
			<ProjectInfo class="o-project__info" {project}></ProjectInfo>
		</div>
	</div>
{:else}
	<a class={classList().join(' ')} href={resolve(`/projects/${project.id}`)}>
		<div class="o-project__preview" style="background-image: url({trailerImage})">
			<div class="o-project__header">
				<div class="o-project__title">{project.title}</div>
				<ProjectInfo class="o-project__info" {project}></ProjectInfo>
			</div>
		</div>
		<p class="o-project__description">{project.brief.description}</p>
	</a>
{/if}

<style lang="scss">
	@use '$styles/globals' as *;

	:global {
		.o-project {
			$this: &;
			$padding: 1rem;

			display: grid;
			grid-template-areas:
				'preview  '
				'desc     ';
			grid-template-rows:
				min-content
				64px;
			grid-template-columns: 1fr;
			row-gap: 0.5rem;
			color: initial;
			text-decoration: none;
			background: white;
			border-radius: 0.5rem;
			filter: drop-shadow(1px 2px 2px lightgray);

			&:hover {
				filter: drop-shadow(3px 4px 8px gray);
			}

			&--locked {
				display: block;
				pointer-events: none;

				&:hover {
					cursor: not-allowed;
				}
			}

			&__locked {
				position: absolute;
				inset: 0;
				display: flex;
				flex-direction: column;
				gap: 1rem;
				align-items: center;
				justify-content: center;

				&__icon {
					width: 6rem;
					height: 6rem;
				}
			}

			&__preview {
				position: relative;
				grid-area: preview;
				width: 100%;
				aspect-ratio: 16 / 9;
				overflow: hidden;
				background-repeat: no-repeat;
				background-position: center;
				background-size: 100%;
				border-top-left-radius: 0.5rem;
				border-top-right-radius: 0.5rem;
				transition: background-size 0.4s;

				#{$this}--locked & {
					background-color: rgb(215 215 215);
				}

				&::after {
					position: absolute;
					inset: 0;
					content: '';
					background: linear-gradient(
						transparent 0%,
						rgb(white, 0%) 40%,
						rgb(white, 70%) 75%,
						rgb(white, 100%) 100%
					);

					#{$this}--locked & {
						display: none;
					}
				}
			}

			&__header {
				position: absolute;
				bottom: 0;
				z-index: 1;
				display: flex;
				flex-direction: column;
				grid-area: header;
				gap: 0.5rem;
				padding: 0 $padding;

				@include size-medium {
					@include text-size('m');
				}

				@include size-small {
					@include text-size('m');
				}
			}

			&__info {
				display: flex;
				column-gap: 0.75rem;
			}

			&__title {
				@include text-paragraph('l');

				font-weight: bold;
			}

			&__description {
				@include text-elipsis(2);

				grid-area: desc;
				padding: 0 $padding;

				@include size-small {
					@include text-size('s');
				}
			}

			&__link {
				display: flex;
				grid-area: link;
				place-self: center flex-end;

				> * {
					width: 100%;
				}
			}
		}
	}
</style>
