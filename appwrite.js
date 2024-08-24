// appwrite.js
import { Client, Databases, Account, Avatars, Storage } from "appwrite";

const url = import.meta.env.VITE_APPWRITE_ENDPOINT;
const project = import.meta.env.VITE_APPWRITE_PROJECT;

const client = new Client();

client.setEndpoint(url).setProject(project);

export const account = new Account(client);
export const database = new Databases(client);
export const avatars = new Avatars(client);
export const storage = new Storage(client);
