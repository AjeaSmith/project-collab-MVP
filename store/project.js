import { defineStore } from "pinia";
import {
	createProject,
	getAllProjects,
	editProject,
	getProject,
} from "~/lib/appwrite/api";

export const useProjectStore = defineStore("project", () => {
	// ---- PROPERTIES -----
	const projects = ref(null);
	const loading = ref(false);
	const error = ref(null);

	// ---- ACTIONS -----
	const getProjects = async () => {
		loading.value = true;
		try {
			const response = await getAllProjects();
			projects.value = response.documents;
			loading.value = false;
		} catch (err) {
			error.value = err;
			console.log(err);
		} finally {
			loading.value = false;
		}
	};

	const createNewProject = async (projectData, userId) => {
		loading.value = true;
		const tagsArray = projectData.tags.split(",").map((tag) => tag.trim());

		try {
			const { imageURL } = await useImageUpload(projectData.file);
			await createProject({
				...projectData,
				tags: tagsArray,
				file: imageURL.href,
				creator: userId,
			});
			loading.value = false;
		} catch (err) {
			error.value = err;
		} finally {
			loading.value = false;
		}
	};
	const edittingProject = async (projectId, data) => {
		loading.value = true;
		const tagsArray = data.tags.split(",").map((tag) => tag.trim());

		try {
			await editProject(projectId, { ...data, tags: tagsArray });
			loading.value = false;
		} catch (err) {
			error.value = err;
		} finally {
			loading.value = false;
		}
	};

	const getProjectById = async (projectId) => {
		loading.value = true;
		try {
			const project = await getProject(projectId);
			loading.value = false;
			return project;
		} catch (err) {
			error.value = err;
		} finally {
			loading.value = false;
		}
	};

	return {
		createNewProject,
		edittingProject,
		getProjectById,
		getProjects,
		projects,
		error,
		loading,
		editLoading,
	};
});
