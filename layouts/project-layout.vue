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
	<div>
		<main
			class="bg-gray-300 my-auto flex h-screen flex-col justify-center items-center p-3"
		>
			<h1 class="text-3xl">{{ pageTitle }}</h1>
			<NuxtPage />
		</main>
	</div>
</template>
