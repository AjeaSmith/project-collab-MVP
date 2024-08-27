<template>
	<Header />
	<div>
		<h2>Explore</h2>
		<section class="flex space-x-3">
			<NuxtLink
				:to="`/projects/edit/${project.$id}`"
				class="border-2 border-red-500 p-3"
				v-for="project in project.projects"
			>
				{{ project.title }} {{ project.creator.name }}
			</NuxtLink>
		</section>
	</div>
</template>

<script setup>
import Header from "~/components/Header.vue";
import { useProjectStore } from "~/store/project";

const project = useProjectStore();

onMounted(async () => {
	await project.getProjects();
});
</script>
