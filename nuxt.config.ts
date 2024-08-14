// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	modules: ["nuxt-appwrite", "shadcn-nuxt", "@nuxtjs/tailwindcss"],
	appwrite: {
		endpoint: process.env.PUBLIC_APPWRITE_ENDPOINT,
		project: process.env.PUBLIC_APPWRITE_PROJECT,
	},
	shadcn: {
		/**
		 * Prefix for all the imported component
		 */
		prefix: "",
		/**
		 * Directory that the component lives in.
		 * @default "./components/ui"
		 */
		componentDir: "./components/ui",
	},
});
