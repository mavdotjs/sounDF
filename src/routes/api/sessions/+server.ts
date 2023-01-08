import client from "$lib/realtime.server"
import db from "$lib/db"
import type { RequestHandler } from "./$types"
import { error } from "@sveltejs/kit"
import { parse } from "$lib/auth"

export let POST: RequestHandler = async ({ request }) => {
    const username = await request.text()
    if(username === "") throw error(400, "Missing username")
    const user = await db.user.findUnique({
        where: {
            username
        }
    })
    if(!user) throw error(404, `User not found \`${username}\``)
    client.channels.get(`user:${user.id}`).publish({
        "name": "create_sessoion",
        "data": {
            plot: parse(request.headers.get("user-agent") || undefined).plot
        }
    })
    return new Response("Ok")
}