<template>
	<Loader2Icon :class="`animate-spin text-blue-500 ${className}`" />
</template>
<script setup>
defineProps({
	className: {
		type: String,
	},
});
import { Loader2Icon } from "lucide-vue-next";
</script>
