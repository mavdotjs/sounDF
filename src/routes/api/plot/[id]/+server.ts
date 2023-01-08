import db from "$lib/db"
import { error, json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"

export let GET: RequestHandler = async ({ params: { id } }) => {
    const plot =  await db.plot.findUnique({
        where: {
            plot_id: parseInt(id)
        }
    })
    if(!plot) throw error(404, `plot:${id} was not found`)
    return json(plot)
}