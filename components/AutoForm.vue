<script setup>
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { AutoForm } from "@/components/ui/auto-form";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useProjectStore } from "~/store/project";
import { Loader2Icon } from "lucide-vue-next";
import { useAuthStore } from "~/store/auth";

const project = useProjectStore();
const user = useAuthStore();

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

	tags: z.string({
		required_error: "Tags is required.",
	}),
	category: z.string({
		required_error: "Category is required.",
	}),
	status: z.enum(["open", "in progress"]),

	file: z.string().optional(),
});

const form = useForm({
	validationSchema: toTypedSchema(schema),
});

onMounted(async () => {
	isEditPageLoading.value = true;

	await user.fetchCurrentUser();
	const projectData = await project.getProjectById(route.params.id);

	isEditPageLoading.value = false;

	if (route.params.id) {
		isEditMode.value = true;
		const tagsString = projectData.tags.join(", ");
		if (projectData) {
			projectImage.value = projectData.file;
			form.setFieldValue("title", projectData.title);
			form.setFieldValue("description", projectData.description);
			form.setFieldValue("tags", tagsString);
			form.setFieldValue("category", projectData.category);
			form.setFieldValue("status", projectData.status);
		}
	}
});

async function onSubmit(values) {
	if (isEditMode.value) {
		// TODO: Test out edit project method
		await project.edittingProject(route.params.id, values);
		router.push("/my-projects");
	} else {
		await project.createNewProject(values, user.current.$id);
		router.push("/my-projects");
	}
}
</script>

<template>
	<div v-if="project.error" class="my-3 text-red-500 text-xl">
		{{ project.error }}
	</div>
	<ClientOnly>
		<template v-if="isEditPageLoading">
			<div class="flex justify-center mt-[200px] h-screen">
				<Loader2Icon class="animate-spin w-[60px] h-[60px]" />
			</div>
		</template>
		<AutoForm
			v-else
			:form="form"
			class="w-full px-10 lg:w-2/3 lg:px-0 space-y-6"
			:schema="schema"
			:field-config="{
				title: {
					label: 'Project Title',
				},
				tags: {
					inputProps: {
						placeholder: 'Enter tags (comma-separated)',
					},
				},
				category: {
					inputProps: {
						placeholder: 'e.g. Art, Music, Tech',
					},
				},
				description: {
					label: 'Project Description',
					component: 'textarea',
				},
				status: {
					label: 'Project status',
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
					<Loader2Icon class="mr-2 animate-spin" />
					<p>Submitting</p>
				</template>
				<template v-else> Submit </template>
			</Button>
		</AutoForm>
	</ClientOnly>
</template>
