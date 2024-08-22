<template>
	<NuxtLayout>
		<ConfigProvider :useId="useIdFunction">
			<NuxtPage />
		</ConfigProvider>
	</NuxtLayout>
</template>

<script setup>
import { ConfigProvider } from "radix-vue";

const useIdFunction = () => useId();
</script>
