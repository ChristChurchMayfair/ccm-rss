// @flow
import fetch from "node-fetch"
import ApolloClient from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import gql from "graphql-tag"

import parsePassage from "./parsePassage"
import { type Sermon } from "./sermon"
import { createXml } from "./rss"

const parseSermon = (sermon: Object): ?Sermon => {
    if (sermon.speakers.length === 0) {
        return null
    }
    return {
        id: sermon.id,
        title: sermon.name,
        passage: sermon.passage,
        seriesTitle: sermon.series.name,
        seriesSubtitle: sermon.series.subtitle || null,
        preachedAt: sermon.preachedAt,
        duration: sermon.duration,
        link: sermon.url,
        imageUrl: sermon.series["image3x2Url"] || null,
        author: sermon.speakers[0].name,
        event: sermon.event.name,
    }
}

const main = async () => {
    const client = new ApolloClient({
        link: createHttpLink({
            uri: "https://api.graph.cool/simple/v1/cjkqvvoxy2pyy0175cdmdy1mz",
            fetch,
        }),
        cache: new InMemoryCache(),
    })
    const result = await client.query({
        query: gql`
            query {
                allSermons(orderBy: preachedAt_DESC) {
                    id
                    name
                    series {
                        name
                        subtitle
                        image3x2Url
                    }
                    preachedAt
                    speakers {
                        name
                    }
                    passage
                    duration
                    url
                    event {
                        name
                    }
                }
            }
        `,
    })

    const sermons = result.data.allSermons.map(s => parseSermon(s))

    const xml = createXml(sermons, new Date())
    return xml
}

export const handler = async () => {
    const xml = await main()
    return {
        isBase64Encoded: false,
        statusCode: 200,
        headers: {
            'Content-Type' : 'application/rss+xml'
        },
        body: xml,
    }
}
