import { error } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import db from "$lib/db"
import { parse } from "$lib/auth"

export let POST: RequestHandler = async ({ request }) => {
    const data = parse(request.headers.get("user-agent") || undefined)
    const owner = db.user.findUnique({
        where: {
            username: data.owner
        }
    })
    if(!owner) throw error(404, "User not found")
    return new Response("OK")
}