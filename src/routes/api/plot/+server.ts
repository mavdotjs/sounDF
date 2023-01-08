import type { RequestHandler } from "./$types"

function parse(userAgent: string) {
    return {
        plot: 0,
        owner: ""
    }
}

export let POST: RequestHandler = ({ request }) => {
    console.log(parse(request.headers.get("User-agent")))
}