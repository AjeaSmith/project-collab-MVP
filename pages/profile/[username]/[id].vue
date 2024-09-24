<template>
	<Header />
	<ClientOnly>
		<section class="container mx-auto py-8">
			<!-- Profile Info Section -->
			<LoadingProfile v-if="isLoading" />
			<div
				v-else
				class="flex flex-col md:flex-row items-center md:items-start md:space-x-6 mb-8"
			>
				<img
					:src="userProfile.profile_image"
					alt="User Avatar"
					class="w-32 h-32 rounded-full mb-4 md:mb-0"
				/>
				<div>
					<span class="flex h-5 mb-3 items-center space-x-2">
						<h1 class="text-3xl font-bold">
							{{ $route.params.username }}
						</h1>
						<Separator orientation="vertical" />
						<small class="italic">{{ userProfile.location }}</small>
						<Separator orientation="vertical" />
						<small>{{ userProfile.availability }}</small>
					</span>

					<p class="text-gray-600 max-w-xl">{{ userProfile.bio }}</p>
					<div class="mt-4">
						<h2 class="text-xl font-semibold mb-2">Skills</h2>
						<ul class="flex flex-wrap gap-2">
							<li
								v-for="skill in userProfile.skills"
								:key="skill"
								class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
							>
								{{ skill }}
							</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Projects Section -->
			<div class="mb-8">
				<h2 class="flex items-center text-2xl font-semibold mb-4">Projects</h2>

				<template v-if="isLoading">
					<LoadingProjects />
				</template>

				<div
					v-else
					class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					<div
						v-for="project in userProfile.projects"
						:key="project.$id"
						class="bg-white p-6 rounded-lg shadow-lg"
					>
						<h3 class="text-xl font-semibold mb-2">{{ project.title }}</h3>
						<p class="text-gray-600 mb-4">
							{{
								truncate(project.description, {
									length: 100,
								})
							}}
						</p>
						<router-link
							:to="`/projects/${project.$id}`"
							class="text-blue-500 hover:underline"
						>
							View Project
						</router-link>
					</div>
				</div>
				<div
					v-if="!isLoading && !userProfile.projects.length"
					class="text-gray-600"
				>
					<p>No projects found.</p>
				</div>
			</div>
		</section>
	</ClientOnly>
</template>

<script setup>
import { truncate } from "lodash";
import { Edit, PlusIcon } from "lucide-vue-next";
import { ref, onMounted } from "vue";
import LoadingProfile from "~/components/LoadingProfile.vue";
import LoadingProjects from "~/components/LoadingProjects.vue";
import { Separator } from "~/components/ui/separator";
import { useUserStore } from "~/store/user";

const route = useRoute();
const user = useUserStore();
const userProfile = ref(null);
const isLoading = ref(true);

const collaborationRequests = ref([
	{
		id: 1,
		senderName: "Jane Smith",
		projectTitle: "Project Gamma",
		message: "I would love to collaborate with you on this project!",
	},
	// Add more requests as needed
]);

onMounted(async () => {
	if (route.params.id) {
		try {
			userProfile.value = await user.fetchUserId(route.params.id);
			isLoading.value = false;
		} finally {
			isLoading.value = false;
		}
	}
});
</script>

<style scoped>
.container {
	max-width: 1400px;
}
</style>
