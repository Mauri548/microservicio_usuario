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
    `,{},
    {
        authorization: `Bearer ${localStorage.getItem('user-token')}`
    }
    )
    .then((data) => {
        console.log(data)
        store.commit('setUserId', data.data.me.id)
    })
}