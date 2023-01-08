import { PRIVATE_ABLY_KEY } from '$env/static/private'
import ably from 'ably'
const client = new ably.Rest.Promise({
    key: PRIVATE_ABLY_KEY
})

export default client