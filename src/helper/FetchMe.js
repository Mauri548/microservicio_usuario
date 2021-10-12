import { GraphQLClient } from 'graphql-request'
import store from '@/store'

export default function FetchMe() {
    const endpoint = store.state.url_backend
    let client = new GraphQLClient(endpoint)
    client.rawRequest(/* GraphQL */`
        query {
            me {
                id,
                name,
                email
            }
        }
    `)
    .then((data) => {
        console.log(data)
    })
}