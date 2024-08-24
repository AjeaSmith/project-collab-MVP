import { dataURLToBlob } from "blob-util";
import { createProjectImage } from "~/lib/appwrite/api";
import _ from "lodash";

// Purpose: Uploads the image file to Appwrite Storage and returns public URL
export const useImageUpload = async (fileData) => {
	const imgBlob = dataURLToBlob(fileData);

	const file = new File([imgBlob], `image-${_.uniqueId()}.png`, {
		type: imgBlob.type,
	});

	const imageURL = await createProjectImage(file);

	return {
		imageURL,
	};
};
