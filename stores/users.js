export const useAuthStore = defineStore("counter", () => {
	// TODO: register user
	// TODO: save to DB
	// TODO: Keep track of user status
	const state = reactive({
		user: null,
		isAuthenticated: false,
	});

	function register() {
		try {
		} catch (err) {}
	}
	function login() {
		try {
		} catch (err) {}
	}

	return { state, register, login };
});
