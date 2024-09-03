export default defineNuxtRouteMiddleware((to) => {
	if (import.meta.client) {
		const authCookie = localStorage.getItem("cookieFallback");
		if (
			authCookie !== "[]" &&
			authCookie !== null &&
			authCookie !== undefined
		) {
			return navigateTo("/");
		}
	}
});
