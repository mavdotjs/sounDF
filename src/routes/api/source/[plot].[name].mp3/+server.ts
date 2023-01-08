import { PRIVATE_BUCKET_URI } from "$env/static/private";
import type { RequestHandler } from "./$types";

export let GET: RequestHandler = async ({ params: { plot, name } }) => {
    return await fetch(`${PRIVATE_BUCKET_URI}${plot}/${name}`) // directly mirror the supabase bucket
}