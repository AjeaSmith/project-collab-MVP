<template>
	<Header />
	<section class="container mx-auto py-8">
		<h1 class="text-3xl font-bold mb-6">My Projects</h1>

		<div v-if="isLoading">
			<Loader2Icon class="animate-spin mx-auto text-blue-500 w-10 h-10" />
		</div>
		<div
			v-if="!isLoading && !userProjects.length"
			class="text-center text-gray-600"
		>
			<p>No projects found. Start by creating a new project.</p>
			<router-link
				to="/projects/new"
				class="text-blue-500 hover:underline mt-4 inline-block"
			>
				Create New Project
			</router-link>
		</div>

		<div
			v-if="!isLoading && userProjects.length"
			class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
		>
			<div
				v-for="project in userProjects"
				:key="project.$id"
				class="bg-white p-6 rounded-lg shadow-lg"
			>
				<h2 class="text-xl font-semibold mb-2">{{ project.title }}</h2>
				<p class="text-gray-600 mb-4">{{ project.description }}</p>

				<div class="flex justify-between items-center">
					<router-link
						:to="`/projects/${project.$id}`"
						class="text-blue-500 hover:underline"
					>
						View Project
					</router-link>
					<router-link
						:to="`/projects/edit/${project.$id}`"
						class="text-blue-500 hover:underline"
					>
						Edit Project
					</router-link>
				</div>
			</div>
		</div>
	</section>
</template>
<script setup>
import { Loader2Icon } from "lucide-vue-next";
import Header from "~/components/Header.vue";
import { useAuthStore } from "~/store/auth";
import { useProjectStore } from "~/store/project";

const project = useProjectStore();
const user = useAuthStore();
const isLoading = ref(true);
const userProjects = ref([]);

onMounted(async () => {
	try {
		await user.fetchCurrentUser();
		userProjects.value = await project.getCurrentUserProjects(user.current.$id);
	} finally {
		isLoading.value = false;
	}
});
</script>
<style scoped>
.container {
	padding-inline: 1rem;
}
</style>
