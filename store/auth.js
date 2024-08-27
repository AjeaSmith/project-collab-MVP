import { defineStore } from "pinia";
import { account } from "~/appwrite";
import {
	createUserAccount,
	getCurrentUser,
	signInAccount,
} from "~/lib/appwrite/api";

export const useAuthStore = defineStore("auth", () => {
	// ---- PROPERTIES -----
	const loading = ref(false);
	const error = ref(null);
	const current = ref(null);
	const isAuthenticated = ref(false);

	// ---- ACTIONS -----
	const register = async (userData) => {
		loading.value = true;
		try {
			await createUserAccount(userData);
			await login(userData); // Login registered user
		} catch (err) {
			// TODO: show toast for user that already logged in
			switch (err.type) {
				case "user_session_already_exists":
					error.value = "Already active session";
					break;
				case "user_already_exists":
					error.value = "User already exist, try signing in";
					break;

				default:
					error.value = err;
					break;
			}
		} finally {
			loading.value = false;
		}
	};

	const login = async (userData) => {
		loading.value = true;
		try {
			await signInAccount(userData);
			loading.value = false;
			navigateTo("/");
			isAuthenticated.value = true;
		} catch (err) {
			switch (err.type) {
				case "user_session_already_exists":
					error.value = "Already active session";
					break;
				case "user_invalid_credentials":
					error.value = "Invalid credentials, please try again";
					break;

				default:
					error.value = err;
					break;
			}
		} finally {
			loading.value = false;
		}
	};

	const logout = async () => {
		await account.deleteSession("current"); // Delete Appwrite user session
		current.value = null; // Clear current ref
		isAuthenticated.value = false;
		navigateTo("sign-in");
	};

	const fetchCurrentUser = async () => {
		try {
			const currentUser = await getCurrentUser();
			current.value = currentUser;
		} catch (err) {
			console.error("Failed to fetch session:", err);
		}
	};

	return {
		current,
		error,
		loading,
		isAuthenticated,
		fetchCurrentUser,
		login,
		logout,
		register,
	};
});
