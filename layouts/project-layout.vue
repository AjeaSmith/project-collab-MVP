<script setup>
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
		class="bg-gray-300 my-auto flex flex-col justify-center items-center p-3"
	>
		<h1 class="text-3xl mb-3">{{ pageTitle }}</h1>
		<NuxtPage />
	</main>
</template>
