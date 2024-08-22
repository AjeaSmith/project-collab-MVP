import { useAuth } from "~/store/auth";

export default defineNuxtRouteMiddleware((to) => {
	const user = useAuth();
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
