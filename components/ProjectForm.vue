<template>
	<section>
		<h2 class="text-center py-3 mb-5 text-4xl font-semibold">
			Create a New Project
		</h2>
		<div class="project-form-container">
			<ClientOnly>
				<form @submit.prevent="onSubmit">
					<FormField v-slot="{ componentField }" name="title">
						<FormItem class="mb-4">
							<FormLabel class="block text-gray-700 font-bold mb-2"
								>Project Title</FormLabel
							>
							<FormControl>
								<Input
									id="title"
									v-bind="componentField"
									placeholder="Enter project title"
									required
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					</FormField>
					<FormField v-slot="{ componentField }" name="description">
						<FormItem class="mb-4">
							<FormLabel class="block text-gray-700 font-bold mb-2"
								>Project Description</FormLabel
							>
							<FormControl>
								<Textarea
									id="description"
									v-bind="componentField"
									placeholder="Enter project description"
									rows="5"
									required
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					</FormField>
					<FormField v-slot="{ componentField }" name="tags">
						<FormItem class="mb-4">
							<FormLabel class="block text-gray-700 font-bold mb-2"
								>Tags</FormLabel
							>
							<FormControl>
								<Input
									id="tags"
									v-bind="componentField"
									placeholder="Enter tags (comma-separated)"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					</FormField>
					<FormField v-slot="{ componentField }" name="category">
						<FormItem class="mb-4">
							<FormLabel class="block text-gray-700 font-bold mb-2"
								>Category</FormLabel
							>
							<FormControl>
								<Input
									id="category"
									v-bind="componentField"
									placeholder="e.g Web Development, Web design etc"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					</FormField>
					<FormField v-slot="{ componentField }" name="status">
						<FormItem class="mb-4">
							<FormLabel class="block text-gray-700 font-bold mb-2"
								>Status</FormLabel
							>
							<FormControl>
								<Select class="mt-3" v-bind="componentField">
									<SelectTrigger class="w-[180px]">
										<SelectValue placeholder="Status" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="open"> Open </SelectItem>
											<SelectItem value="progress"> In progress </SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					</FormField>
					<!-- Upload Images/Media -->
					<!-- <FormField class="mb-4">
	    				<FormLabel class="block text-gray-700 font-bold mb-2"
	    					>Upload Images/Media</FormLabel
	    				>
	    				<Input
	    					id="media"
	    					type="file"
	    					multiple
	    					@change="handleMediaUpload"
	    					class="w-full px-3 py-2 border rounded-lg"
	    				/>
	    			</FormField> -->
					<!-- Save/Update Button -->
					<div class="flex justify-end">
						<Button
							type="submit"
							class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
						>
							{{ isEditMode ? "Update Project" : "Create Project" }}
						</Button>
					</div>
				</form>
			</ClientOnly>
			<!-- Auth Form -->
		</div>
	</section>
</template>

<script setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	FormLabel,
} from "./ui/form";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useProject } from "~/store/project";

const router = useRouter();
const route = useRoute();
const projectsStore = useProject();

const form = reactive({
	title: "",
	description: "",
	tags: "",
	// media: [],
});

const isEditMode = ref(false);
const projectId = ref(null);

const formSchema = toTypedSchema(
	z.object({
		title: z.string().min(3, "Title must be at least 3 characters long"),
		description: z
			.string()
			.min(10, "Description must be at least 10 characters long"),
		tags: z.string().min(1, "Field is required"),
		// media: z
		// 	.array(z.instanceof(File))
		// 	.optional()
		// 	.refine(
		// 		(files) => files.every((file) => file.size <= 5 * 1024 * 1024),
		// 		"Each file must be less than 5MB"
		// 	)
		// 	.refine(
		// 		(files) => files.every((file) => file.type.startsWith("image/")),
		// 		"Only image files are allowed"
		// 	),
	})
);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
	initialValues: form,
});

onMounted(async () => {
	projectId.value = route.params.id;
	if (projectId.value) {
		isEditMode.value = true;
		const project = await projectsStore.fetchProjectById(projectId.value);
		if (project) {
			form.title = project.title;
			form.description = project.description;
			form.skills = project.skills.join(", ");
			// form.media = project.media || [];
		}
	}
});

const onSubmit = handleSubmit(async (values) => {
	console.log(values);
});
</script>

<style scoped>
.project-form-container {
	max-width: 600px;
	margin: auto;
	padding: 2rem;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
