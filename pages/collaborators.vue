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

		<!-- Collaborators Grid -->
		<div
			v-if="filteredCollaborators.length"
			class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
		>
			<div
				v-for="collaborator in filteredCollaborators"
				:key="collaborator.id"
				class="bg-white p-6 rounded-lg shadow-lg"
			>
				<h2 class="text-xl font-semibold mb-2">{{ collaborator.name }}</h2>
				<p class="text-gray-600 mb-2">
					Skills: {{ collaborator.skills.join(", ") }}
				</p>
				<p class="text-gray-600 mb-2">Location: {{ collaborator.location }}</p>
				<p class="text-gray-600 mb-2">
					Availability: {{ collaborator.availability }}
				</p>

				<router-link
					:to="`/collaborators/${collaborator.id}`"
					class="text-blue-500 hover:underline"
				>
					View Profile
				</router-link>
			</div>
		</div>

		<!-- No Results Message -->
		<div v-else class="text-center text-gray-600">
			<p>No collaborators found matching your criteria.</p>
		</div>
	</section>
</template>

<script setup>
import { ref, computed } from "vue";
import Header from "~/components/Header.vue";

const collaborators = ref([
	// Sample data
	{
		id: 1,
		name: "John Doe",
		skills: ["JavaScript", "Vue.js", "Design"],
		location: "New York, USA",
		availability: "Full-time",
	},
	{
		id: 2,
		name: "Jane Smith",
		skills: ["Python", "Data Science", "Machine Learning"],
		location: "Remote",
		availability: "Part-time",
	},
	// Add more collaborators as needed
]);

const filters = ref({
	skills: "",
	location: "",
	availability: "",
});

const applyFilters = () => {
	// This function could be used to trigger filtering in a real application
	console.log("Filters applied:", filters.value);
};

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
