<template>
	<Header />
	<section class="container mx-auto py-8">
		<h1 class="text-3xl font-bold mb-6">Explore Projects</h1>

		<div v-if="isLoading">
			<LoadingSpinner className="mx-auto w-10 h-10" />
		</div>

		<div v-else class="mb-8 flex">
			<input
				v-model="searchQuery"
				type="text"
				placeholder="Find projects by title, category, or description..."
				class="w-full border px-4 py-2 rounded-lg"
			/>
		</div>
		<!-- No Results Message -->
		<div
			v-if="!isLoading && !filteredProjects.length"
			class="text-center text-gray-600"
		>
			<p>No projects found matching your search.</p>
		</div>

		<!-- Projects Grid -->
		<section
			v-if="!isLoading && filteredProjects.length"
			class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
		>
			<div
				v-for="project in filteredProjects"
				:key="project.id"
				class="flex flex-col justify-between bg-white p-6 rounded-lg shadow-lg"
			>
				<div>
					<h2 class="text-xl font-semibold mb-2">{{ project.title }}</h2>
					<p class="text-gray-600 mb-4">
						{{
							truncate(project.description, {
								length: 100,
							})
						}}
					</p>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm text-gray-500">{{ project.category }}</span>
					<router-link
						v-if="user.isAuthenticated"
						:to="`/projects/${project.$id}`"
						class="text-blue-500 hover:underline"
					>
						View Project
					</router-link>
				</div>
			</div>
		</section>
	</section>
</template>

<script setup>
import { truncate } from "lodash";
import Header from "~/components/Header.vue";
import LoadingSpinner from "~/components/LoadingSpinner.vue";
import { useProjectStore } from "~/store/project";
import { useUserStore } from "~/store/user";

const project = useProjectStore();
const user = useUserStore();
const projects = ref([]);
const isLoading = ref(true);
const searchQuery = ref("");

onMounted(async () => {
	try {
		projects.value = await project.getProjects();
	} finally {
		isLoading.value = false;
	}
});

const filteredProjects = computed(() => {
	if (!searchQuery.value) {
		return projects.value;
	}

	const lowerCaseQuery = searchQuery.value.toLowerCase();

	return projects.value.filter((project) => {
		return (
			project.title.toLowerCase().includes(lowerCaseQuery) ||
			project.description.toLowerCase().includes(lowerCaseQuery) ||
			project.tags.includes(lowerCaseQuery) ||
			project.category.toLowerCase().includes(lowerCaseQuery) ||
			project.status.toLowerCase().includes(lowerCaseQuery)
		);
	});
});
</script>
<style scoped>
.container {
	padding-inline: 1rem;
	max-width: 1400px;
}

.bg-white {
	background-color: white;
}
</style>
