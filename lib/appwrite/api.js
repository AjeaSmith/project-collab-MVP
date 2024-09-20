import { ID, Query } from "appwrite";
import { account, database, avatars, storage } from "~/appwrite";

const databaseId = import.meta.env.VITE_DATABASE_ID;
const usersCollectionId = import.meta.env.VITE_USERS_COLLECTION_ID;
const projectsCollectionId = import.meta.env.VITE_PROJECTS_COLLECTION_ID;
const collaboratorsCollectionId = import.meta.env.VITE_COLLAB_COLLECTION_ID;
const storageBucketId = import.meta.env.VITE_STORAGE_BUCKET_ID;

// ---------------- USER API -------------------
export async function createUserAccount(user) {
	// const skillsArray = user.skills.split(",").map((skill) => skill.trim());
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
			bio: user.bio,
			skills: user.skills,
			availability: user.availability,
			location: user.location,
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
export async function getAllUsers(userId) {
	try {
		// Fetch all documents from the collaborations collection
		const allUsers = await database.listDocuments(
			databaseId,
			usersCollectionId,
			[Query.notEqual("$id", userId)]
		);

		return allUsers.documents;
	} catch (error) {
		console.log("get all users error:", error);
		throw error;
	}
}

// ----------------- PROJECT API -----------------
export async function getAllProjects() {
	try {
		const projects = await database.listDocuments(
			databaseId,
			projectsCollectionId
		);

		return projects;
	} catch (err) {
		console.log("get all projects:", err);
		throw err;
	}
}
export async function getProject(projectId) {
	try {
		const project = await database.listDocuments(
			databaseId,
			projectsCollectionId,
			[Query.equal("$id", projectId)]
		);

		return project.documents[0];
	} catch (err) {
		console.log("Fetch project:", err);
		throw err;
	}
}
export async function getUserProjects(userId) {
	try {
		const projects = await database.listDocuments(
			databaseId,
			projectsCollectionId,
			[Query.equal("creator", userId)]
		);

		return projects.documents;
	} catch (err) {
		console.log("Fetch user projects:", err);
		throw err;
	}
}

export async function createProject(projectData) {
	try {
		await database.createDocument(
			databaseId,
			projectsCollectionId,
			ID.unique(),
			projectData
		);
	} catch (err) {
		console.log("create project:", err);
		throw err;
	}
}
export async function createProjectImage(file) {
	try {
		const response = await storage.createFile(
			storageBucketId,
			ID.unique(),
			file
		);
		const fileUrl = storage.getFileView(
			response.bucketId, // The bucket ID returned from the upload response
			response.$id // The file ID returned from the upload response
		);

		return fileUrl;
	} catch (err) {
		console.log("creating project image: ", err);
		throw err;
	}
}
export async function editProject(projectId, data) {
	try {
		await database.updateDocument(
			databaseId,
			projectsCollectionId,
			projectId,
			data
		);
	} catch (err) {
		console.log("update project:", err);
		throw err;
	}
}
export async function deleteProject(projectId) {
	try {
		await database.deleteDocument(databaseId, projectsCollectionId, projectId);
	} catch (err) {
		console.log("delete project:", err);
		throw err;
	}
}
