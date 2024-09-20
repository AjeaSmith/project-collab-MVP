<script setup>
import { ArrowLeft } from "lucide-vue-next";
</script>

<template>
	<main class="bg-gray-200 p-4 h-full">
		<section class="w-full flex mb-5 justify-between items-center">
			<router-link
				to="/"
				class="flex items-center space-x-2 flex-auto text-blue-500"
			>
				<ArrowLeft />
				<span>Back</span>
			</router-link>
		</section>
		<section class="flex flex-col items-center max-w-screen-xl mx-auto">
			<NuxtPage />
		</section>
	</main>

</template>
