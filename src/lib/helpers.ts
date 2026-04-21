import type { IProject, IEmployer } from '$lib';

const projectFiles = import.meta.glob('./projects/*.json');
const sourceFiles = import.meta.glob('./projects/*.md', { query: '?raw', import: 'default' });

interface IEmployerList {
	employers: Record<string, IEmployer>;
}

export async function getEmployer(id: string) {
	const employerList: IEmployerList = (await import('./employers.json')).default;
	return employerList.employers[id];
}

export async function getProject(id: string) {
	const jsonPath = `./projects/${id}.json`;

	if (!projectFiles[jsonPath]) {
		console.warn(`Attempted to load invalid project ID: ${id}`);
		throw new Error(`Project ${id} not found`);
	}

	const projectModule = (await projectFiles[jsonPath]()) as { default: IProject };
	const project = projectModule.default;

	const mdPath = `./projects/${id}.md`;

	return {
		...project,
		source: sourceFiles[mdPath] ? ((await sourceFiles[mdPath]()) as string) : '',
		employer: await getEmployer(project.brief.employer),
		id
	};
}
