<template>
	<AuthForm type="sign-up" />
</template>

<script setup>
definePageMeta({
	middleware: "check-session",
});
</script>
