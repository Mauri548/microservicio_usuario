import store from '@/store'
import { GraphQLClient } from 'graphql-request'

const removePermission = (id, company_user_id) => {
    const endpoint = store.state.url_backend
    const client = new GraphQLClient(endpoint)
    client.rawRequest(/* GraphQL */`
    mutation($company_user_id: ID!, $id: ID!) {
        removeUse_permission(company_user_id: $company_user_id ,id: $id) {
            id, use_permit_id, use_company_use_user_id
        }
    }`,
    {
        id: id,
        company_user_id: company_user_id
    })
    .then((data) => {
        console.log(data)
    })
    .catch(error => console.log(error.response))
}

export default removePermission