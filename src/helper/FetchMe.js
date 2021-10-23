import { GraphQLClient } from 'graphql-request'
import store from '@/store'

export default async function FetchMe() {
    const endpoint = store.state.url_backend
    let client = new GraphQLClient(endpoint)
    await client.rawRequest(/* GraphQL */`
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
        // console.log(data)
        store.commit('setUserId', data.data.me.id)
        localStorage.setItem('user_id',data.data.me.id)
    })

    return
}