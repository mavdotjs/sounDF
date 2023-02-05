import type { RequestHandler } from "./$types"

export let GET: RequestHandler = async ({ params: { uuid } }) => {
    return await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`)
}