<template>
	<div
		:class="`flex flex-col items-center bg-gray-10 ${
			type !== 'sign-up' ? 'justify-center h-screen' : ''
		}`"
	>
		<section>
			<h1 class="text-3xl font-bold text-center text-gray-800">
				Join Our Community of Creative Innovators
			</h1>
			<p class="mb-5 text-lg text-center text-gray-600 max-w-xl">
				Share your ideas, and collaborate on groundbreaking projects.
			</p>
		</section>
		<div class="bg-white p-8 mt-2 rounded-lg shadow-lg w-full max-w-2xl">
			<!-- Page Title -->
			<h2 class="text-2xl font-bold text-gray-800 text-center">
				{{ type === "sign-up" ? "Sign up" : "Sign in" }}
			</h2>

			<div v-if="user.error" class="text-red-500 text-center mb-2">
				{{ user.error }}
			</div>

			<!-- Auth Form -->
			<ClientOnly>
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
						<FormField v-slot="{ componentField }" name="bio">
							<FormItem class="mb-4">
								<FormLabel class="block text-md text-gray-700 font-medium mb-2"
									>Bio</FormLabel
								>
								<FormControl>
									<Textarea
										type="text"
										placeholder="Write something about yourself..."
										v-bind="componentField"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						</FormField>

						<FormField v-slot="{ value }" name="skills">
							<FormItem class="mb-4">
								<FormLabel>Skills</FormLabel>
								<FormControl>
									<TagsInput :model-value="value">
										<TagsInputItem
											v-for="item in value"
											:key="item"
											:value="item"
										>
											<TagsInputItemText />
											<TagsInputItemDelete />
										</TagsInputItem>

										<TagsInputInput placeholder="Skills..." />
									</TagsInput>
								</FormControl>
								<FormMessage />
							</FormItem>
						</FormField>

						<FormField v-slot="{ componentField }" name="availability">
							<FormItem class="mb-4">
								<FormLabel>Availability</FormLabel>

								<Select v-bind="componentField">
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select your Availability" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="part-time"> Part Time </SelectItem>
											<SelectItem value="full-time"> Full Time </SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						</FormField>

						<FormField v-slot="{ componentField }" name="location">
							<FormItem class="mb-4 flex-1">
								<FormLabel class="block text-md text-gray-700 font-medium mb-2"
									>Location</FormLabel
								>
								<FormControl>
									<Input
										type="text"
										placeholder="e.g. Michigan"
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
							<LoadingSpinner />
							Authenticating
						</div>
						<template v-else>{{
							type === "sign-up" ? "Register" : "Log in"
						}}</template>
					</Button>
					<p class="text-center text-gray-600 mt-4">
						{{
							type === "sign-up"
								? "Already have an account?"
								: "Don't have an account?"
						}}
						<router-link
							class="text-blue-600 hover:underline"
							v-if="type === 'sign-up'"
							to="sign-in"
							>Sign in</router-link
						>
						<router-link
							class="text-blue-600 hover:underline"
							v-else
							to="sign-up"
							>Sign up</router-link
						>
					</p>
				</form>
			</ClientOnly>
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
import { useUserStore } from "~/store/user";
import LoadingSpinner from "./LoadingSpinner.vue";
import TagsInput from "./ui/tags-input/TagsInput.vue";
import TagsInputItem from "./ui/tags-input/TagsInputItem.vue";
import TagsInputItemText from "./ui/tags-input/TagsInputItemText.vue";
import TagsInputItemDelete from "./ui/tags-input/TagsInputItemDelete.vue";
import TagsInputInput from "./ui/tags-input/TagsInputInput.vue";

const user = useUserStore();

// * conditonally render fields based on which form type is being used
const formSchema = toTypedSchema(
	z.object({
		...(props.type === "sign-up"
			? {
					name: z.string().min(4),
					bio: z.string().min(10),
					skills: z
						.array(z.string())
						.min(2, "At least 2 skills is required")
						.max(10, "maxiumn 10 skills allowed"),
					availability: z.string(),
					location: z.string(),
					confirmPassword: z
						.string()
						.min(8)
						.refine((val) => val === form.values.password, {
							message: "Passwords don't match",
						}),
			  }
			: {}),
		email: z.string().email(),
		password: z.string().min(8),
	})
);

const form = useForm({
	validationSchema: formSchema,
	initialValues: {
		skills: [],
	},
});

const onSubmit = form.handleSubmit(async (values) => {
	if (props.type === "sign-up") {
		await user.register(values);
	} else {
		await user.login(values);
	}
});
</script>
