import { PUBLIC_ABLY_KEY } from '$env/static/public'
import ably from 'ably'
const client = new ably.Realtime.Promise({
    key: PUBLIC_ABLY_KEY
})

export default client