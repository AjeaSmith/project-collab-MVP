import { defineStore } from "pinia";
import { account } from "~/appwrite";
import {
	createUserAccount,
	getCurrentUser,
	signInAccount,
} from "~/lib/appwrite/api";

export const useProject = defineStore("project", () => {
	// ---- PROPERTIES -----
	const loading = ref(false);
	const error = ref(null);
	// ---- ACTIONS -----

	return {};
});
