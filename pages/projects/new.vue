<template>
	<AutoForm />
</template>

<script setup>
definePageMeta({
	layout: "project-layout",
});
import AutoForm from "~/components/AutoForm.vue";
import { useUserStore } from "~/store/user";

const user = useUserStore();

onMounted(() => {
	console.log(user.isAuthenticated);
});
</script>
