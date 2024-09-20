<template>
	<!-- TODO: add success and error messages with toast -->
	<div v-if="project.error" class="my-3 text-red-500 text-xl">
		{{ project.error }}
	</div>

	<template v-if="isEditPageLoading">
		<div class="flex justify-center mt-[200px] h-screen">
			<LoadingSpinner className="w-[60px] h-[60px]" />
		</div>
	</template>

	<template v-else>
		<h1 class="text-2xl font-semibold">
			{{ isEditMode ? "Edit Project" : "Create New Project" }}
		</h1>
		<AutoForm
			:form="form"
			class="w-full lg:w-2/3 lg:px-0 space-y-6"
			:schema="schema"
			:field-config="{
				title: {
					label: 'Project Title',
				},

				category: {
					inputProps: {
						placeholder: 'Select category',
					},
				},
				description: {
					label: 'Project Description',
					component: 'textarea',
				},
				status: {
					label: 'Project status',
					inputProps: {
						placeholder: 'Select status',
					},
				},
				file: {
					label: 'Upload Image',
					component: 'file',
				},
			}"
			@submit="onSubmit"
		>
			<template v-if="projectImage">
				<ImagePreviewer :image="projectImage" />
			</template>
			<Button type="submit" class="w-full" :disabled="project.loading">
				<template v-if="project.loading">
					<LoadingSpinner className="mr-2" />
					<p>Submitting</p>
				</template>
				<template v-else> Submit </template>
			</Button>
		</AutoForm>
	</template>
</template>

<script setup>
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { AutoForm } from "@/components/ui/auto-form";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useProjectStore } from "~/store/project";
import { useUserStore } from "~/store/user";
import LoadingSpinner from "./LoadingSpinner.vue";

const project = useProjectStore();
const user = useUserStore();

const route = useRoute();
const router = useRouter();

const isEditMode = ref(false);
const isEditPageLoading = ref(false);
const projectImage = ref(null);

const schema = z.object({
	title: z
		.string({
			required_error: "Title is required.",
		})
		.min(2, {
			message: "Title must be at least 2 characters.",
		}),

	description: z.string().min(10, {
		message: "Description must be at least 10 characters.",
	}),

	category: z.enum(["tech", "art", "web design", "web development", "mobile"]),
	status: z.enum(["open", "in progress"]),

	file: z.string(),
});

const form = useForm({
	validationSchema: toTypedSchema(schema),
});

onMounted(async () => {
	await user.fetchCurrentUser();

	if (route.params.id) {
		isEditPageLoading.value = true;
		isEditMode.value = true;

		const projectData = await project.getProjectById(route.params.id);

		isEditPageLoading.value = false;

		if (projectData) {
			projectImage.value = projectData.file;
			form.setFieldValue("title", projectData.title);
			form.setFieldValue("description", projectData.description);
			form.setFieldValue("category", projectData.category);
			form.setFieldValue("status", projectData.status);
		}
	}
});

async function onSubmit(values) {
	if (isEditMode.value) {
		// TODO: Test out edit project method
		await project.edittingProject(route.params.id, values);
		router.push("/projects");
	} else {
		await project.createNewProject(values, user.current.$id);
		router.push("/projects");
	}
}
</script>
