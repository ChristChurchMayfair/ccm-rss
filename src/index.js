// @flow
import fetch from "node-fetch"
import ApolloClient from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import gql from "graphql-tag"

const main = async () => {
    const client = new ApolloClient({
        link: createHttpLink({
            uri: "https://api.graph.cool/simple/v1/cjhoh936q44gz0181840a6nlj",
            fetch,
        }),
        cache: new InMemoryCache(),
    })
    const result = await client.query({
        query: gql`
            query {
                allSermons(orderBy: preachedAt_DESC, first: 40) {
                    name
                    series {
                        name
                        subtitle
                    }
                    preachedAt
                    speakers {
                        name
                    }
                }
            }
        `,
    })
    console.log(result.data)
}

main()
