import { GraphQLClient } from 'graphql-request'
import store from '@/store'

const createPermission = async (permit_id, use_company_id, company_user_id) => {
    const endpoint = store.state.url_backend
    const client = new GraphQLClient(endpoint)
    await client.rawRequest(/* GraphQL */`
    mutation($company_user_id: ID!, $use_permit_id: ID!, $use_company_use_user_id: ID!) {
        createsUse_permission(company_user_id: $company_user_id ,input: {
            use_permit_id: $use_permit_id,
            use_company_use_user_id: $use_company_use_user_id
        }) {
            id, use_permit_id, use_company_use_user_id
        }
    }`,
    {
        use_permit_id: permit_id,
        use_company_use_user_id: use_company_id,
        company_user_id: company_user_id
    })
    .then((data) => {
        console.log(data)
    })
    .catch(error => {
        console.log('Error en la consulta')
        store.commit("setStatusError", true)
    })
}

export default createPermission