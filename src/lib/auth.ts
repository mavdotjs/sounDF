import lucia from "lucia-auth";
import prisma from "@lucia-auth/adapter-prisma";
import db from "$lib/db"

export const auth = lucia({
	adapter: prisma(db), // TODO: initialize Prisma client
	env: import.meta.env.MODE as "DEV" | "PROD"
});

export type Auth = typeof auth;