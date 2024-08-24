import { defineStore } from "pinia";
import { account } from "~/appwrite";
import {
	createProject,
	createUserAccount,
	getCurrentUser,
	signInAccount,
} from "~/lib/appwrite/api";

export const useProject = defineStore("project", () => {
	// ---- PROPERTIES -----
	const loading = ref(false);
	const error = ref(null);
	// ---- ACTIONS -----

	const createNewProject = async (projectData) => {
		loading.value = true;
		try {
			await createProject(projectData);
			loading.value = false;
		} catch (err) {
			error.value = err;
		}
	};
	const getProjectById = async (projectId) => {};

	return {
		createNewProject,
		getProjectById,
		error,
		loading,
	};
});
