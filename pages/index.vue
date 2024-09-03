<template>
	<div>
		<Header />
		<!-- Hero Section -->
		<section class="bg-gray-100 py-16">
			<div class="container mx-auto text-center">
				<h1 class="text-5xl font-bold text-gray-800 mb-4">
					Unite Creative Minds
				</h1>
				<p class="text-lg text-gray-600 mb-6">
					Share your projects, find collaborators, and bring your ideas to life.
				</p>
				<ClientOnly>
					<NuxtLink
						v-if="!user.isAuthenticated"
						to="sign-in"
						class="bg-white text-slate-700 border-2 border-slate-800 px-2.5 py-2 rounded-sm"
					>
						Sign in to Create Project
					</NuxtLink>

					<NuxtLink
						v-else
						to="projects/new"
						class="px-4 py-2 rounded-sm bg-blue-500 text-white hover:bg-blue-700"
					>
						Create a New Project
					</NuxtLink>
				</ClientOnly>
			</div>
		</section>

		<!-- Featured Projects Section -->
		<section class="py-12">
			<div class="container mx-auto">
				<h2 class="text-3xl font-bold text-gray-800 mb-6">Featured Projects</h2>
				<LoadingSpinner v-if="project.loading" className="w-10 h-10 mx-auto" />
				<div
					v-else
					class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
				>
					<NuxtLink
						v-for="project in featuredProjects"
						:key="project.$id"
						:to="`project/${project.$id}`"
						class="shadow-lg"
					>
						<Card>
							<img
								:src="project.file"
								alt="Project image"
								class="w-full h-48 object-cover rounded-t-lg"
							/>
							<div class="p-4">
								<h3 class="text-xl font-semibold text-gray-800">
									{{
										truncate(project.title, {
											length: 30,
											separator: " ",
										})
									}}
								</h3>
								<p class="text-gray-600 my-2">
									{{
										truncate(project.description, {
											length: 120,
											separator: " ",
										})
									}}
								</p>
								<p class="text-blue-500 hover:text-blue-700">View Project</p>
							</div>
						</Card>
					</NuxtLink>
				</div>
			</div>
		</section>

		<!-- Categories Overview Section -->
		<!-- <section class="py-12 bg-gray-100">
			<div class="container mx-auto">
				<h2 class="text-3xl font-bold text-gray-800 mb-6">Categories</h2>
				<div
					class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
				>
					<Card
						v-for="category in categories"
						:key="category.name"
						class="shadow-lg text-center"
					>
						<div class="text-primary text-5xl mb-4">
							<i :class="category.icon"></i>
						</div>
						<h3 class="text-xl font-semibold text-gray-800">
							{{ category.name }}
						</h3>
						<Button variant="link" class="mt-4">Explore</Button>
					</Card>
				</div>
			</div>
		</section> -->
	</div>
</template>

<script setup>
import { truncate } from "lodash";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "~/components/Header.vue";
import { useProjectStore } from "~/store/project";
import { useUserStore } from "~/store/user";
import LoadingSpinner from "~/components/LoadingSpinner.vue";
const user = useUserStore();
const project = useProjectStore();

const projects = ref([]);
onMounted(async () => {
	projects.value = await project.getProjects();
});

const featuredProjects = computed(() => {
	return projects.value.slice(0, 5);
});
// const featuredProjects = [
// 	{
// 		id: 1,
// 		title: "Project 1",
// 		description: "This is a brief description of Project 1.",
// 		image: "project1.jpg",
// 	},
// 	{
// 		id: 2,
// 		title: "Project 2",
// 		description: "This is a brief description of Project 2.",
// 		image: "project2.jpg",
// 	},
// 	// Add more project data...
// ];
</script>

<style scoped>
.bg-primary {
	background-color: #007bff;
}
.text-primary {
	color: #007bff;
}
</style>
