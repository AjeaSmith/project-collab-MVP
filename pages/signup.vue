<template>
	<!-- TODO: ask chatGPT what kind of state is needed to manage users -->
	<!-- TODO: setup pinia for state management and user actions -->
	<!-- TODO: register user into DB -->
	<!-- TODO: hook up google provider with appwrite for google sign in option -->
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
				Create an Account
			</h2>

			<!-- Registration Form -->
			<form @submit="onSubmit">
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

				<!-- Register Button -->
				<Button type="submit" class="w-full">Register</Button>
			</form>

			<!-- Divider -->
			<div class="flex items-center justify-center my-4">
				<hr class="w-full border-t border-gray-300" />
				<span class="px-4 text-gray-500">or</span>
				<hr class="w-full border-t border-gray-300" />
			</div>

			<!-- Google Sign-In Button -->
			<Button type="button" variant="secondary" class="w-full cursor-pointer">
				Sign in with Google
			</Button>

			<!-- Link to Login Page -->
			<p class="text-center text-gray-600 mt-4">
				Already have an account?
				<NuxtLink to="login" class="text-blue-600 hover:underline"
					>Log in</NuxtLink
				>
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
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

const { account } = useAppwrite();

const formSchema = toTypedSchema(
	z
		.object({
			email: z.string().email(),
			password: z.string().min(8),
			confirmPassword: z.string().min(8),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: "Passwords don't match",
			path: ["confirmPassword"], // path to show the error on the confirmPassword field
		})
);

const form = useForm({
	validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
	console.log("Form submitted!", values);
});
// import { ref } from 'vue';

// const { account, ID } = useAppwrite();

// const email = ref('');
// const password = ref('');
// const confirmPassword = ref('');

// const register = async () => {
//   if (password.value !== confirmPassword.value) {
//     alert('Passwords do not match!');
//     return;
//   }

//   try {
//     await account.create(ID.unique(), email.value, password.value);
//     alert('Registration successful! Please log in.');
//     // Redirect to login page or automatically log in the user
//   } catch (error) {
//     console.error('Registration error:', error);
//     alert('Registration failed. Please try again.');
//   }
// };
</script>
