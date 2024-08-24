<script setup>
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { AutoForm } from "@/components/ui/auto-form";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useProject } from "~/store/project";
import { dataURLToBlob } from "blob-util";

const project = useProject();

const route = useRoute();

const isEditMode = ref(false);
const projectId = ref(null);

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

// onMounted(async () => {
// 	projectId.value = route.params.id;
// 	if (projectId.value) {
// 		isEditMode.value = true;
// 		form.setFieldValue("title", projectId.value);
// 		const project = project.getProjectById(projectId.value);
// 		if (project) {
// 			form.title = project.title;
// 			form.description = project.description;
// 			form.tags = project.tags.join(", ");
// 			// form.media = project.media || [];
// 		}
// 	}
// });

async function onSubmit(values) {
	const tagsArray = values.tags.split(",").map((tag) => tag.trim());

	const { imageURL } = await useImageUpload(values.file);

	console.log({ ...values, tags: tagsArray, file: imageURL.href });

	// await project.createNewProject({
	// 	...values,
	// 	tags: tagsArray,
	// });
}
</script>

<template>
	<ClientOnly>
		<AutoForm
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
			<Button type="submit" class="w-full"> Submit </Button>
		</AutoForm>
	</ClientOnly>
</template>
