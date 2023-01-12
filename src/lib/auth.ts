import lucia, { type Session } from "lucia-auth";
import prisma from "@lucia-auth/adapter-prisma";
import db from "$lib/db"
import { error } from "@sveltejs/kit";
import { handleHooks, handleServerSession } from "@lucia-auth/sveltekit";
import type { Handle } from "@sveltejs/kit";
import type { LayoutServerLoad } from "../routes/$types";
import type { PageData } from "@lucia-auth/sveltekit/types";

export const auth = lucia({
	adapter: prisma(db), // TODO: initialize Prisma client
	env: import.meta.env.MODE as "DEV" | "PROD",
    async transformUserData(userData) {
        const user = await db.user.findUnique({
            where: {
                id: userData.id
            },
            // include: {
            //     plots: {
            //         include: {
            //             sounds: {
            //                 include: {
            //                     plot: false
            //                 }
            //             },
            //             owner: false
            //         }
            //     },
                
            // },
            select: {
                hashed_password: false,
                id: true,
                plots: {
                    select: {
                        id: true,
                        name: true,
                        owner: false,
                        owner_id: true,
                        plot_id: true,
                        sounds: {
                            select: {
                                file_id: true,
                                id: true,
                                name: true,
                                plot: false,
                                plot_id: true
                            }
                        }
                    }
                },
                provider_id: false,
                role: true,
                session: false,
                username: true
            }
        })
        return user
    },
});

export type Auth = typeof auth;

export function parse(userAgent: string = "") {
    const userAgentRegex = /^DiamondFire\/\d\.\d \((?<plot>\d+), (?<author>\w+)\)$/g.exec(userAgent)?.groups
    if(!userAgentRegex) throw error(400, "Not authorized.")
    return {
        plot: parseInt(userAgentRegex.plot),
        owner: userAgentRegex.author
    }
}

export function hooks(): Handle {
    return async (request) => {
        const { event, resolve } = request;
        // @ts-ignore
        const lucia = await (handleHooks(auth))(request)
        let getSessionPromise: any;
        let getSessionUserPromise: any;
        request.event.locals.Hvalidate = async () => {
            if (getSessionPromise) return getSessionPromise;
            if (getSessionUserPromise) return (await getSessionUserPromise).session;
            getSessionPromise = new Promise(async (resolve) => {
                try {
                    const sessionId = event.request.headers.get("x-lucia-auth") || "";
                    const session = await auth.validateSession(sessionId);
                    // if (session.isFresh) {
                    //     event.locals.setSession(session);
                    // }
                    resolve(session);
                }
                catch {
                    event.locals.setSession(null);
                    resolve(null);
                }
            });
            return getSessionPromise;
        }
        event.locals.HvalidateUser = async () => {
            if (getSessionUserPromise) return getSessionUserPromise;
            getSessionUserPromise = new Promise(async (resolve) => {
                try {
                    const sessionId = event.request.headers.get("x-lucia-auth") || "";
                    const { session, user } = await auth.validateSessionUser(sessionId);
                    // if (session.isFresh) {
                    //     event.locals.setSession(session);
                    // }
                    resolve({ session, user });
                }
                catch {
                    resolve({
                        session: null,
                        user: null
                    });
                }
            });
        }
        return lucia
    }
}

export function layout(): LayoutServerLoad {
    return async (request) => {
        const { locals } = request
        const lucia = await (handleServerSession())(request) as PageData & { _lucia: { session: Session | null } }
        if(!lucia._lucia) return lucia
        lucia._lucia.user = await lucia._lucia?.user // for some reason pilcrowonpaper doesnt want to fix this issue
        lucia._lucia.session = await locals.validate()
        return lucia
    }
}