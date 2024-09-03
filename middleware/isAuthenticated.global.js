import { useUserStore } from "~/store/user";

export default defineNuxtRouteMiddleware((to) => {
	const user = useUserStore();
	if (import.meta.client) {
		const authCookie = localStorage.getItem("cookieFallback");
		if (
			authCookie &&
			authCookie !== "[]" &&
			authCookie !== null &&
			authCookie !== undefined
		) {
			user.isAuthenticated = true;
		} else if (!authCookie) {
			user.isAuthenticated = false;
		}
	}
});
