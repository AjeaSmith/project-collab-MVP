<script setup>
import { ArrowLeft } from "lucide-vue-next";

// Dynamically set the title based on the route
const route = useRoute();
const pageTitle = computed(() => {
	return route.name === "projects-new"
		? "Create a New Project"
		: `Edit Project`;
});
</script>

<template>
	<main
		class="bg-gray-300 my-auto px-10 h-screen flex flex-col justify-center items-center p-3 space-y-5"
	>
		<section class="w-full flex mb-5 justify-between items-center">
			<router-link
				to="/"
				class="flex items-center space-x-2 flex-auto text-blue-500"
			>
				<ArrowLeft />
				<span>Back</span>
			</router-link>
			<h1 class="text-3xl flex-auto">{{ pageTitle }}</h1>
		</section>
		<NuxtPage />
	</main>
</template>
