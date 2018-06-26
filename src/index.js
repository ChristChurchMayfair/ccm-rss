// @flow
import fetch from "node-fetch"
import ApolloClient from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import gql from "graphql-tag"

import parsePassage from "./parsePassage"

type Sermon = {
    id: string,
    title: string,
    passage: string,
    seriesTitle: string,
    seriesSubtitle: string,
    preachedAt: string,
    duration: number,
    link: string,
    imageUrl: string,
    author: string,
    event: string,
}

const parseSermon = (sermon: Object): ?Sermon => {
    if (sermon.speakers.length === 0) {
        return null
    }
    return {
        id: sermon.id,
        title: sermon.name,
        passage: parsePassage("niv-long", sermon.passage),
        seriesTitle: sermon.series.name,
        seriesSubtitle: sermon.series.subtitle,
        preachedAt: sermon.preachedAt,
        duration: sermon.duration,
        link: sermon.url,
        imageUrl: sermon.series["image3x2Url"],
        author: sermon.speakers[0].name,
        event: sermon.event.name,
    }
}

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
    console.log(result.data.allSermons.map(s => parseSermon(s)))
}

main()
