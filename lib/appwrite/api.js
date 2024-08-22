import { ID, Query } from "appwrite";
import { account, database, avatars } from "~/appwrite";

const databaseId = import.meta.env.VITE_DATABASE_ID;
const usersCollectionId = import.meta.env.VITE_USERS_COLLECTION_ID;

// --- AUTH USER ----
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

		await database.createDocument(databaseId, usersCollectionId, ID.unique(), {
			accountId: newAccount.$id,
			name: newAccount.name,
			email: newAccount.email,
			profile_image: avatarUrl,
		});
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

export async function getCurrentUser() {
	try {
		const currentAccount = await account.get();

		if (!currentAccount) throw Error;

		const currentUser = await database.listDocuments(
			databaseId,
			usersCollectionId,
			[Query.equal("accountId", currentAccount.$id)]
		);

		if (!currentUser) throw Error;

		return currentUser.documents[0];
	} catch (error) {
		console.log("current user error:", error);
		return null;
	}
}
