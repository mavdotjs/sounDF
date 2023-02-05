import prisma from "$lib/db";
import type { PageServerLoad } from "./$types";

export let load: PageServerLoad = async () => {
    return {data: await prisma.code.findMany({
        where: {
            used: false
        }
    })}
}