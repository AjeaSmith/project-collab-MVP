<template>
    <!-- TODO: test out this delete func -->
	<AlertDialog>
		<AlertDialogTrigger as-child>
			<Trash2Icon class="text-red-500 cursor-pointer" />
		</AlertDialogTrigger>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
				<AlertDialogDescription>
					This action cannot be undone. This will permanently delete your
					account and remove your data from our servers.
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction :onclick="project.removeProject(props.projectId)"
					>Continue</AlertDialogAction
				>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
</template>
<script setup>
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2Icon } from "lucide-vue-next";
import { useProjectStore } from "~/store/project";

const props = defineProps(["projectId"]);
const project = useProjectStore();


</script>
