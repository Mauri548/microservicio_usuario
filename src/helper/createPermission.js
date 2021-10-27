import { GraphQLClient } from 'graphql-request'
import store from '@/store'

const createPermission = (permit_id, use_company_id) => {
    console.log(permit_id)
    console.log(use_company_id)

    const endpoint = store.state.url_backend
    const client = new GraphQLClient(endpoint)
    client.rawRequest(/* GraphQL */`
    mutation($use_permit_id: ID!, $use_company_use_user_id: ID!) {
        createsUse_permission(input: {
            use_permit_id: $use_permit_id,
            use_company_use_user_id: $use_company_use_user_id
        }) {
            id, use_permit_id, use_company_use_user_id
        }
    }`,
    {
        use_permit_id: permit_id,
        use_company_use_user_id: use_company_id
    })
    .then((data) => {
        console.log(data)
    })
    .catch(error => console.log(error.response))
}

export default createPermission