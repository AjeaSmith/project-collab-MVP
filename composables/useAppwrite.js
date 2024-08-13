import { useNuxtApp } from "#imports";

export const useAppwrite = () => {
	const { $appwrite } = useNuxtApp();
	if (!$appwrite) throw new Error("Appwrite plugin not accessible");

	return $appwrite;
};
