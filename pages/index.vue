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
					<router-link
						v-if="user.isAuthenticated"
						to="projects/new"
						class="px-4 py-2 rounded-sm bg-blue-500 text-white hover:bg-blue-700"
					>
						Create a New Project
					</router-link>
					<router-link
						v-else
						to="/sign-in"
						class="px-4 py-2 rounded-sm bg-blue-500 text-white hover:bg-blue-600"
					>
						Sign in for Full Access
					</router-link>
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
					<router-link
						v-for="project in featuredProjects"
						:key="project.$id"
						:to="`projects/${project.$id}`"
						class="shadow-lg"
					>
						<Card class="h-full">
							<img
								:src="project.file"
								alt="Project image"
								class="w-full h-48 object-cover rounded-t-lg"
							/>
							<div class="h-[50%] flex flex-col justify-between p-4">
								<section>
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
								</section>
								<p
									v-if="user.isAuthenticated"
									class="text-blue-500 hover:text-blue-700"
								>
									View Project
								</p>
							</div>
						</Card>
					</router-link>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
import { truncate } from "lodash";
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
</script>

<style scoped>
.bg-primary {
	background-color: #007bff;
}
.text-primary {
	color: #007bff;
}
</style>
