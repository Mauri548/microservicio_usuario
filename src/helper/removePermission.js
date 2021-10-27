import store from '@/store'
import { GraphQLClient } from 'graphql-request'

const removePermission = (id) => {
    const endpoint = store.state.url_backend
    const client = new GraphQLClient(endpoint)
    client.rawRequest(/* GraphQL */`
    mutation($id: ID!) {
        id, use_permit_id, use_company_use_user_id
    }`,
    {
        id: id    
    })
    .then((data) => {
        console.log(data)
    })
    .catch(error => console.log(error.response))
}

export default removePermission