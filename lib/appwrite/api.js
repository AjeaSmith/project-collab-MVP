import { ID } from "appwrite";
import { account, database, avatars } from "~/appwrite";

const usersDatabaseId = import.meta.env.VITE_DATABASE_ID;
const usersCollectionId = import.meta.env.VITE_COLLECTION_ID;

export async function createUserAccount(user) {
	try {
		const newAccount = await account.create(
			ID.unique(),
			user.email,
			user.password,
			user.name
		);

		if (!newAccount) throw Error;

		const avatarUrl = avatars.getInitials(user.name);

		await database.createDocument(
			usersDatabaseId,
			usersCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				name: newAccount.name,
				email: newAccount.email,
				profile_image: avatarUrl,
			}
		);
	} catch (error) {
		console.log(error);
		return error;
	}
}

export async function signInAccount({ email, password }) {
	try {
		await account.createEmailPasswordSession(email, password);
	} catch (error) {
		console.log(error);
		throw error;
	}
}
