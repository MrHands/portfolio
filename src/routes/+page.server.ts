import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { IProject } from '$lib';
import { getProject } from '$lib/helpers';

export const load: PageServerLoad = async () => {
	const module = await import('../index.json');
	if (module) {
		const index = module.default;
		const promises: Promise<IProject>[] = index.featured.map(async (id) => getProject(id));

		const projects = await Promise.all(promises);
		const images = projects.map((it) => {
			return {
				src: it.trailer.image,
				alt: it.title,
				title: it.title
			};
		});

		return {
			projects,
			images
		};
	}

	error(404, 'Not found');
};
export const prerender = true;
