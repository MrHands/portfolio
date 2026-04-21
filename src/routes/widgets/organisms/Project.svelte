<script lang="ts">
	import { resolve } from '$app/paths';
	import { type IProject } from '$lib';

	interface Props {
		project: IProject;
		class?: string;
	}
	let { project, class: className = '' }: Props = $props();

	const trailerImage = $derived(`./media/previews/${project.trailer.image}`);
</script>

<a class={['o-project', className].join(' ')} href={resolve(`/projects/${project.id}`)}>
	<div class="o-project__preview" style="background-image: url({trailerImage})">
		<div class="o-project__header">
			<div class="o-project__title">{project.title}</div>
			<div class="o-project__info">
				<div class="o-project__company">{project.employer.name}</div>
				<div class="o-project__divider"></div>
				<div class="o-project__role">{project.brief.role}</div>
			</div>
		</div>
	</div>

	<p class="o-project__description">{project.brief.description}</p>
</a>

<style lang="scss">
	@use '$styles/globals' as *;

	.o-project {
		$padding: 1rem;

		display: grid;
		grid-template-areas:
			'preview  '
			'desc     ';
		grid-template-rows:
			min-content
			min-content;
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

		&__preview {
			position: relative;
			grid-area: preview;
			height: 0;
			padding-top: 56.25%;
			overflow: hidden;
			background-repeat: no-repeat;
			background-position: center;
			background-size: auto;
			background-size: 100%;
			border-top-left-radius: 0.5rem;
			border-top-right-radius: 0.5rem;
			transition: background-size 0.4s;

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
		}

		&__info {
			display: flex;
			gap: 12px;
		}

		&__title {
			@include text-paragraph('l');

			font-weight: bold;
		}

		&__divider {
			border-right: 1px solid gray;
		}

		&__company {
			@include text-paragraph('m');

			font-weight: normal;
			color: get-shade($clr-highlight, 400);
			text-transform: uppercase;
		}

		&__description {
			grid-area: desc;
			padding: 0 $padding;
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

	@include size-medium {
		.o-project {
			&__header {
				@include text-size('m');
			}

			&__company {
				@include text-size('s');
			}

			&__description {
				@include text-size('s');
			}
		}
	}

	@include size-small {
		.o-project {
			&__header {
				@include text-size('m');
			}

			&__company {
				@include text-size('s');
			}
		}
	}
</style>
