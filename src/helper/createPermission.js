import { GraphQLClient } from 'graphql-request'

const createPermission = (endpoint, permit_id, use_company_id) => {
    const client = new GraphQLClient(endpoint)
    client.rawRequest(/* GraphQL */`
    mutation(use_permit_id: ID, use_compnay_use_user_id: ID) {
        createsUse_permission(input: {
            use_permit_id: $use_permit_id,
            use_compnay_use_user_id: $use_compnay_use_user_id
        }) {
            id, use_permit_id, use_compnay_use_user_id
        }
    }`,
    {
        use_permit_id: permit_id,
        use_company_use_user_id: use_company_id
    })
    .then((data) => {
        console.log(data)
    })
    .catch(error => console.log(error))
}

export default createPermission