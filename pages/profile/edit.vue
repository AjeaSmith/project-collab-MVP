<template>
	<section class="container mx-auto py-8">
		<router-link to="/profile" class="text-blue-500 flex">
			<ArrowLeftIcon /> Back</router-link
		>
		<h1 class="text-3xl font-bold mb-6 mt-6">Edit Profile</h1>

		<template v-if="isEditPageLoading">
			<LoadingSpinner className="mx-auto my-10 w-10 h-10" />
		</template>
		<template v-else>
			<form @submit="onSubmit">
				<!-- Name -->
				<FormField v-slot="{ componentField }" name="name">
					<FormItem class="mb-6">
						<FormLabel>Name</FormLabel>
						<FormControl>
							<Input
								type="text"
								v-bind="componentField"
								placeholder="Enter your name"
							/>
						</FormControl>
					</FormItem>
				</FormField>

				<FormField v-slot="{ componentField }" name="bio">
					<!-- Bio -->
					<FormItem class="mb-6">
						<FormLabel>Bio</FormLabel>
						<FormControl>
							<Textarea
								v-bind="componentField"
								placeholder="Tell us a little bit about yourself"
								class="resize-none"
							/>
						</FormControl>
					</FormItem>
				</FormField>

				<!-- Skills -->
				<FormField v-slot="{ value }" name="skills">
					<FormItem class="mb-6">
						<FormLabel>Skills</FormLabel>
						<FormControl>
							<TagsInput :model-value="value">
								<TagsInputItem v-for="item in value" :key="item" :value="item">
									<TagsInputItemText />
									<TagsInputItemDelete />
								</TagsInputItem>

								<TagsInputInput placeholder="e.g react, python..." />
							</TagsInput>
						</FormControl>
					</FormItem>
				</FormField>

				<FormField v-slot="{ componentField }" name="availability">
					<FormItem class="mb-6">
						<FormLabel for="availability">Availability</FormLabel>
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
					</FormItem>
				</FormField>

				<!-- Location -->
				<FormField v-slot="{ componentField }" name="location">
					<FormItem class="mb-6">
						<FormLabel>Location</FormLabel>
						<FormControl>
							<Input
								type="text"
								v-bind="componentField"
								placeholder="Enter your location"
							/>
						</FormControl>
					</FormItem>
				</FormField>

				<!-- Save Button -->
				<div class="text-right">
					<Button
						:disabled="user.loading"
						type="submit"
						class="w-full md:w-auto bg-blue-500 hover:bg-blue-600"
					>
						<template v-if="user.loading">
							<LoadingSpinner className="mr-2" /> Saving
						</template>
						<template v-else>Save Changes</template>
					</Button>
				</div>
			</form>
		</template>
	</section>
</template>

<script setup>
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { ArrowLeftIcon } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { ref } from "vue";
import { useToast } from "@/components/ui/toast/use-toast";

import LoadingSpinner from "~/components/LoadingSpinner.vue";
import Button from "~/components/ui/button/Button.vue";
import FormControl from "~/components/ui/form/FormControl.vue";
import FormItem from "~/components/ui/form/FormItem.vue";
import FormLabel from "~/components/ui/form/FormLabel.vue";
import Input from "~/components/ui/input/Input.vue";
import { useUserStore } from "~/store/user";
import Select from "~/components/ui/select/Select.vue";

const { toast } = useToast();
const user = useUserStore();
const isEditPageLoading = ref(false);

const formSchema = toTypedSchema(
	z.object({
		name: z.string().min(4),
		bio: z.string().min(10),
		skills: z
			.array(z.string())
			.min(2, "At least 2 skills is required")
			.max(10, "maxiumn 10 skills allowed"),
		availability: z.string(),
		location: z.string(),
	})
);

const form = useForm({
	validationSchema: formSchema,
});

onMounted(async () => {
	isEditPageLoading.value = true;
	try {
		await user.fetchCurrentUser();
		isEditPageLoading.value = false;
		if (user.current) {
			form.setFieldValue("name", user.current.name);
			form.setFieldValue("bio", user.current.bio);
			form.setFieldValue("availability", user.current.availability);
			form.setFieldValue("skills", user.current.skills);
			form.setFieldValue("location", user.current.location);
		}
	} catch (err) {
		toast({
			title: "Uh oh! Something went wrong",
			description: err.message,
			variant: "destructive",
		});
	} finally {
		isEditPageLoading.value = false;
	}
});

// Save profile data
const onSubmit = form.handleSubmit(async (values) => {
	try {
		await user.updateProfile(values);
		toast({
			title: "Profile updated successfully!",
		});
		navigateTo("/profile");
	} catch (err) {
		toast({
			title: "Uh oh! Something went wrong",
			description: err.message,
			variant: "destructive",
		});
	}
});
</script>

<style scoped>
.container {
	max-width: 1000px;
}

input[type="file"] {
	display: block;
	margin-top: 0.5rem;
}
</style>
