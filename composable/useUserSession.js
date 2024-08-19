import { ref } from "vue";
import { account } from "../appwrite";
import { createUserAccount, signInAccount } from "~/lib/appwrite/api";

export const useUserSession = () => {
	const loading = ref(false);
	const error = ref(null);
	const current = useState("currentUser", () => null);

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
		navigateTo("sign-in");
	};

	const fetchCurrentUser = async () => {
		try {
			const currentUser = await account.get();
			current.value = currentUser;
		} catch (err) {
			console.error("Failed to fetch session:", err);
		}
	};

	return {
		current,
		error,
		loading,
		fetchCurrentUser,
		login,
		logout,
		register,
	};
};
