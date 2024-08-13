"use server"
import { Query, ID } from "node-appwrite";
import { parseStringify } from "../utils";
import {
    NEXT_PUBLIC_BUCKET_ID,
    DATABASE_ID,
    NEXT_PUBLIC_ENDPOINT,
    PATIENT_COLLECTION_ID,
    PROJECT_ID,
    databases,
    storage,
    users,
} from "../appwrite.config";
export async function createUser(user: CreateUserParams) {
    try {
        const newuser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        );

        return parseStringify(newuser);

    } catch (error: any) {
        if (error && error?.code === 409) {
            const existingUser = await users.list([
                Query.equal("email", [user.email]),
            ]);

            return existingUser.users[0];
        }
        console.error("An error occurred while creating a new user:", error);

    }
}