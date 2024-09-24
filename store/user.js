import { defineStore } from "pinia";
import { account } from "~/appwrite";
import {
	createUserAccount,
	editProfile,
	getAllUsers,
	getCurrentUser,
	getUserById,
	signInAccount,
} from "~/lib/appwrite/api";

export const useUserStore = defineStore("user", () => {
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
					error.value = err.message;
					break;
			}
			console.log("err create account:", err);
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
		loading.value = true;
		await account.deleteSession("current"); // Delete Appwrite user session
		loading.value = false;
		current.value = null; // Clear current ref
		isAuthenticated.value = false;
		navigateTo("/");
	};

	const updateProfile = async (data) => {
		loading.value = true;
		try {
			await editProfile(data);
			loading.value = false;
			// navigate to profile
		} catch (err) {
			console.log("UPDATE PROFILE:", err);
			throw err;
		} finally {
		}
	};

	const fetchUserId = async (userId) => {
		try {
			const user = await getUserById(userId);
			return user;
		} catch (err) {
			console.log("Fetching user by id", err);
			throw err;
		}
	};

	const fetchCurrentUser = async () => {
		try {
			const currentUser = await getCurrentUser();
			current.value = currentUser;
		} catch (err) {
			console.error("Failed to fetch session:", err);
			throw err;
		}
	};

	const fetchAllUsers = async () => {
		loading.value = true;
		try {
			const users = await getAllUsers(current.value.$id);
			loading.value = false;

			return users;
		} catch (err) {
			console.error("Failed to fetch collaborators:", err);
			error.value = err;
		} finally {
			loading.value = false;
		}
	};

	return {
		current,
		error,
		loading,
		isAuthenticated,
		updateProfile,
		fetchUserId,
		fetchCurrentUser,
		fetchAllUsers,
		login,
		logout,
		register,
	};
});
