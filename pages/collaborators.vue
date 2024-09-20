<template>
	<Header />
	<section class="container mx-auto py-8">
		<h1 class="text-3xl font-bold mb-6">Find Collaborators</h1>

		<!-- Filters Section -->
		<div class="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
			<!-- Filter by Skills -->
			<div>
				<label for="skills" class="block text-gray-700 font-medium mb-2"
					>Skills:</label
				>
				<input
					id="skills"
					v-model="filters.skills"
					type="text"
					placeholder="e.g. JavaScript, Design"
					class="border px-3 py-2 rounded-lg w-full"
				/>
			</div>
			<!-- Filter by Location -->
			<div>
				<label for="location" class="block text-gray-700 font-medium mb-2"
					>Location:</label
				>
				<input
					id="location"
					v-model="filters.location"
					type="text"
					placeholder="e.g. New York, Remote"
					class="border px-3 py-2 rounded-lg w-full"
				/>
			</div>
			<!-- Filter by Availability -->
			<div>
				<label for="availability" class="block text-gray-700 font-medium mb-2"
					>Availability:</label
				>
				<select
					id="availability"
					v-model="filters.availability"
					class="border px-3 py-2 rounded-lg w-full"
				>
					<option value="">Any</option>
					<option value="part-time">Part-time</option>
					<option value="full-time">Full-time</option>
				</select>
			</div>
		</div>

		<div v-if="isLoading">
			<LoadingSpinner className="mx-auto my-5 w-10 h-10" />
		</div>

		<!-- Collaborators Grid -->
		<div
			v-if="!isLoading && filteredCollaborators.length"
			class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
		>
			<div
				v-for="collaborator in filteredCollaborators"
				:key="collaborator.id"
				class="bg-white p-6 rounded-lg shadow-lg"
			>
				<h2 class="text-xl font-semibold mb-2">{{ collaborator.name }}</h2>
				<p class="text-gray-600 mb-2">
					<b>Skills:</b> {{ collaborator.skills.join(", ") }}
				</p>
				<p class="text-gray-600 mb-2">
					<b>Location</b>: {{ collaborator.location }}
				</p>
				<p class="text-gray-600 mb-2">
					<b>Availability:</b> {{ collaborator.availability }}
				</p>
				<router-link
					:to="`/project/${collaborator.$id}`"
					class="text-blue-500 hover:underline"
				>
					View Profile
				</router-link>
			</div>
		</div>

		<!-- No Results Message -->
		<div
			v-if="!isLoading && !filteredCollaborators.length"
			class="text-center text-gray-600"
		>
			<p>No collaborators found matching your criteria.</p>
		</div>
	</section>
</template>

<script setup>
import { ref, computed } from "vue";
import Header from "~/components/Header.vue";
import LoadingSpinner from "~/components/LoadingSpinner.vue";
import { useUserStore } from "~/store/user";
const user = useUserStore();

const collaborators = ref([]);
const isLoading = ref(true);

const filters = ref({
	skills: "",
	location: "",
	availability: "",
});

onMounted(async () => {
	try {
		await user.fetchCurrentUser();
		collaborators.value = await user.fetchAllUsers();
	} finally {
		isLoading.value = false;
	}
});

// Computed property to filter collaborators based on the selected filters
const filteredCollaborators = computed(() => {
	return collaborators.value.filter((collaborator) => {
		const skillsMatch = filters.value.skills
			? collaborator.skills.some((skill) =>
					skill.toLowerCase().includes(filters.value.skills.toLowerCase())
			  )
			: true;
		const locationMatch = filters.value.location
			? collaborator.location
					.toLowerCase()
					.includes(filters.value.location.toLowerCase())
			: true;
		const availabilityMatch = filters.value.availability
			? collaborator.availability.toLowerCase() === filters.value.availability
			: true;

		return skillsMatch && locationMatch && availabilityMatch;
	});
});
</script>

<style scoped>
.container {
	max-width: 1400px;
	padding-inline: 1rem;
}

.bg-white {
	background-color: white;
}
</style>
