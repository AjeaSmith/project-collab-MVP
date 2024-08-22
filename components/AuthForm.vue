<template>
	<div
		class="min-h-screen flex flex-col gap-y-5 items-center justify-center bg-gray-50"
	>
		<h1 class="text-4xl font-bold text-center text-gray-800">
			Join Our Community of Creative Innovators
		</h1>
		<p class="mb-5 text-xl text-center text-gray-600 max-w-xl">
			Share your ideas, and collaborate on groundbreaking projects.
		</p>
		<div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
			<!-- Page Title -->
			<h2 class="text-2xl font-bold text-gray-800 text-center mb-6">
				{{ type === "sign-up" ? "Sign up" : "Sign in" }}
			</h2>

			<div v-if="user.error" class="text-red-500 text-center mb-2">
				{{ user.error }}
			</div>

			<!-- Auth Form -->
			<form @submit="onSubmit">
				<template v-if="type === 'sign-up'">
					<FormField v-slot="{ componentField }" name="name">
						<FormItem class="mb-4">
							<FormLabel class="block text-md text-gray-700 font-medium mb-2"
								>Name</FormLabel
							>
							<FormControl>
								<Input
									type="text"
									placeholder="John Doe"
									v-bind="componentField"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					</FormField>
				</template>
				<!-- Email Input -->
				<FormField v-slot="{ componentField }" name="email">
					<FormItem class="mb-4">
						<FormLabel class="block text-md text-gray-700 font-medium mb-2"
							>Email</FormLabel
						>
						<FormControl>
							<Input
								type="email"
								placeholder="e.g johndoe@mail.com"
								v-bind="componentField"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
				<FormField v-slot="{ componentField }" name="password">
					<FormItem class="mb-4">
						<FormLabel class="block text-md text-gray-700 font-medium mb-2"
							>Password</FormLabel
						>
						<FormControl>
							<Input
								type="password"
								placeholder="********"
								v-bind="componentField"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
				<template v-if="type === 'sign-up'">
					<FormField v-slot="{ componentField }" name="confirmPassword">
						<FormItem class="mb-4">
							<FormLabel class="block text-md text-gray-700 font-medium mb-2"
								>Confirm Password</FormLabel
							>
							<FormControl>
								<Input
									type="password"
									placeholder="********"
									v-bind="componentField"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					</FormField>
				</template>

				<!-- login Button -->
				<Button type="submit" class="w-full" :disabled="user.loading">
					<div
						v-if="(type === 'sign-up' || type === 'sign-in') && user.loading"
						class="flex items-center"
					>
						<Loader2Icon class="animate-spin h-5 w-5 mr-2" />
						Authenticating
					</div>
					<template v-else>{{
						type === "sign-up" ? "Register" : "Log in"
					}}</template>
				</Button>
			</form>

			<p class="text-center text-gray-600 mt-4">
				{{
					type === "sign-up"
						? "Already have an account?"
						: "Don't have an account?"
				}}
				<NuxtLink
					class="text-blue-600 hover:underline"
					v-if="type === 'sign-up'"
					to="sign-in"
					>Sign in</NuxtLink
				>
				<NuxtLink class="text-blue-600 hover:underline" v-else to="sign-up"
					>Sign up</NuxtLink
				>
			</p>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	type: {
		type: String,
		default: "sign-in",
	},
});

import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2Icon } from "lucide-vue-next";
import { useAuth } from "~/store/auth";

const user = useAuth();

// * conditonally render fields based on which form type is being used
const formSchema = toTypedSchema(
	z.object({
		...(props.type === "sign-up"
			? {
					name: z.string().min(4),
			  }
			: {}),
		email: z.string().email(),
		password: z.string().min(8),
		...(props.type === "sign-up"
			? {
					confirmPassword: z
						.string()
						.min(8)
						.refine((val) => val === form.values.password, {
							message: "Passwords don't match",
						}),
			  }
			: {}),
	})
);

const form = useForm({
	validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
	if (props.type === "sign-up") {
		await user.register(values);
	} else {
		await user.login(values);
	}
});
</script>
