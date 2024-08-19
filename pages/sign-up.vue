<template>
	<AuthForm type="sign-up" />
</template>

<script setup>
definePageMeta({
	middleware: "is-authenticated",
});
</script>
