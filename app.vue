<template>
	<Toaster />
	<NuxtLayout>
		<ConfigProvider :useId="useIdFunction">
			<NuxtPage />
		</ConfigProvider>
	</NuxtLayout>
</template>

<script setup>
import { ConfigProvider } from "radix-vue";
import Toaster from "@/components/ui/toast/Toaster.vue";

const useIdFunction = () => useId();
</script>
