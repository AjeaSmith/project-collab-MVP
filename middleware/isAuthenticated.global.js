import { useUserStore } from "~/store/user";

export default defineNuxtRouteMiddleware((to) => {
	const user = useUserStore();

	// Allow public routes ('/explore', '/collaborations') without authentication
	const publicRoutes = ["/explore", "/sign-in", "/sign-up"];
	if (publicRoutes.includes(to.path)) {
		return; // Allow access to public routes
	}

	if (import.meta.client) {
		const authCookie = localStorage.getItem("cookieFallback");

		if (authCookie && authCookie !== "[]" && authCookie !== null) {
			user.isAuthenticated = true;
			if (to.path === "/sign-in" || to.path === "/sign-up") {
				return navigateTo("/");
			}
		} else {
			user.isAuthenticated = false;
			// Redirect to "/" only if the user is not already on the home page
			if (to.path !== "/") {
				return navigateTo("/");
			}
		}
	}
});
