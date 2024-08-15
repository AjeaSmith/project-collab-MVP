<template>
	<ConfigProvider :useId="useIdFunction">
		<NuxtPage />
	</ConfigProvider>
</template>

<script setup>
import { ConfigProvider } from "radix-vue";

const useIdFunction = () => useId();
</script>
