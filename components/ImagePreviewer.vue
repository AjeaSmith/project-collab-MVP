<template>
	<div class="max-w-sm">
		<div class="mb-4">
			<img
				:src="image"
				alt="Selected Image"
				class="w-full h-auto rounded-lg shadow-md"
			/>
		</div>
	</div>
</template>

<script setup>
defineProps({
	image: {
		type: String,
	},
});
</script>

