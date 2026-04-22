import type { PageServerLoad } from './$types';
import type { IProject } from '$lib';
import { GetFeaturedList, GetPreviewImage, getProject } from '$lib/helpers';

export const load: PageServerLoad = async () => {
	const featured = await GetFeaturedList();
	const promises: Promise<IProject>[] = featured.map(async (id) => getProject(id));
	const projects = await Promise.all(promises);

	const images = projects.map((it) => {
		return {
			src: GetPreviewImage(it.trailer.image),
			alt: it.title,
			title: it.title,
			project: it
		};
	});

	return {
		projects,
		images
	};
};
