<template>
	<AuthForm />
</template>

<script setup>
definePageMeta({
	middleware: "is-authenticated",
});
</script>
