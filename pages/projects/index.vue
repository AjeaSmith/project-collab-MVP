<template>
	<Header />
	<!-- TODO: implement delete project  -->
	<!-- TODO: add more options for delete and edit actions  -->
	<section class="container mx-auto py-8">
		<h1 class="flex items-center text-3xl font-bold mb-6">
			My Projects
			<router-link to="/projects/new" class="ml-2 text-blue-500">
				<PlusIcon />
			</router-link>
		</h1>

		<div v-if="isLoading">
			<LoadingSpinner className="mx-auto w-10 h-10" />
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
				class="flex flex-col justify-between bg-white p-6 rounded-lg shadow-lg"
			>
				<section>
					<div class="flex justify-between items-center">
						<h2 class="text-xl font-semibold mb-2">{{ project.title }}</h2>
						<Trash2Icon class="text-red-500" />
					</div>
					<p class="text-gray-600 mb-4">
						{{
							truncate(project.description, {
								length: 100,
							})
						}}
					</p>
				</section>

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
import { PlusIcon, Trash2Icon } from "lucide-vue-next";
import Header from "~/components/Header.vue";
import LoadingSpinner from "~/components/LoadingSpinner.vue";
import { useProjectStore } from "~/store/project";
import { useUserStore } from "~/store/user";
import { truncate } from "lodash";

const project = useProjectStore();
const user = useUserStore();
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
