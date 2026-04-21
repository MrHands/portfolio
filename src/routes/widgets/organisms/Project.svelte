<script lang="ts">
	import { type IProject } from '../../../project-types';

	export let project: IProject;

	let className = '';
	export { className as class };
</script>

<a class={['o-project', className].join(' ')} href="projects/{project.id}">
	<div
		class="o-project__preview"
		style="background-image: url('./media/previews/{project.trailer.image}')"
	></div>
	<div class="o-project__header">
		{project.title}
		<div class="o-project__company">{project.employer.name}</div>
	</div>
	<p class="o-project__description">{project.brief.description}</p>
</a>

<style lang="scss">
	@import '$styles/globals';

	.o-project {
		$padding: 1rem;

		display: grid;
		grid-template-areas:
			'preview  '
			'header   '
			'desc     '
			'link     ';
		grid-template-rows:
			min-content
			min-content
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
		}

		&__header {
			display: flex;
			flex-direction: column;
			grid-area: header;
			padding: 0 $padding;
			font-weight: bold;

			@include text-paragraph('l');
		}

		&__company {
			grid-area: company;
			font-weight: normal;
			color: get-shade($clr-highlight, 400);
			text-transform: uppercase;

			@include text-paragraph('m');
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
