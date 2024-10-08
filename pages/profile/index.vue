<template>
	<Header />
	<section class="container mx-auto py-8">
		<!-- Profile Info Section -->
		<LoadingProfile v-if="!user.current" />
		<div
			v-else
			class="flex flex-col md:flex-row items-center md:items-start md:space-x-6 mb-8"
		>
			<img
				:src="user.current.profile_image"
				alt="User Avatar"
				class="w-32 h-32 rounded-full mb-4 md:mb-0"
			/>
			<div>
				<div class="flex justify-between mb-4">
					<span class="flex h-5 items-center space-x-2">
						<h1 class="text-3xl font-bold">
							{{ user.current.name }}
						</h1>
						<Separator orientation="vertical" />
						<small class="italic">{{ user.current.location }}</small>
						<Separator orientation="vertical" />
						<small>{{ user.current.availability }}</small>
					</span>
					<router-link to="profile/edit">
						<Edit class="w-6 h-6 text-blue-500 cursor-pointer" />
					</router-link>
				</div>
				<p class="text-gray-600 max-w-xl">{{ user.current.bio }}</p>
				<div class="mt-4">
					<h2 class="text-xl font-semibold mb-2">Skills</h2>
					<ul class="flex flex-wrap gap-2">
						<li
							v-for="skill in user.current.skills"
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
			<h2 class="flex items-center text-2xl font-semibold mb-4">
				Projects
				<router-link class="ml-2" to="/projects/new">
					<PlusIcon class="text-blue-500" />
				</router-link>
			</h2>

			<template v-if="isLoading">
				<LoadingProjects />
			</template>

			<div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				<div
					v-for="project in user.current.projects"
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
				v-if="!isLoading && !user.current.projects.length"
				class="text-gray-600"
			>
				<p>No projects found.</p>
			</div>
		</div>

		<!-- Collaboration Requests Section -->
		<div>
			<h2 class="text-2xl font-semibold mb-4">Collaboration Requests</h2>
			<div v-if="collaborationRequests.length" class="space-y-4">
				<div
					v-for="request in collaborationRequests"
					:key="request.id"
					class="bg-gray-100 p-4 rounded-lg shadow-sm"
				>
					<p class="text-gray-800 mb-2">
						<strong>{{ request.senderName }}</strong> wants to collaborate on
						<strong>{{ request.projectTitle }}</strong
						>.
					</p>
					<p class="text-gray-600 mb-2">Message: {{ request.message }}</p>
					<div class="flex space-x-4">
						<button
							class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
						>
							Accept
						</button>
						<button
							class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
						>
							Decline
						</button>
					</div>
				</div>
			</div>
			<div v-else class="text-gray-600">
				<p>No collaboration requests.</p>
			</div>
		</div>
	</section>
</template>

<script setup>
import { truncate } from "lodash";
import { Edit, PlusIcon } from "lucide-vue-next";
import { ref, onMounted } from "vue";
import LoadingProfile from "~/components/LoadingProfile.vue";
import LoadingProjects from "~/components/LoadingProjects.vue";
import { Separator } from "~/components/ui/separator";
import { useUserStore } from "~/store/user";
const user = useUserStore();
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
	try {
		await user.fetchCurrentUser();
	} finally {
		isLoading.value = false;
	}
});
</script>

<style scoped>
.container {
	max-width: 1400px;
}
</style>
