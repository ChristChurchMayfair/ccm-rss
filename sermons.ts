import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import fetch from "node-fetch"
import ApolloClient from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import gql from "graphql-tag"

import "./parsePassage"
import { Sermon } from "./types/sermon"
import { createXml } from "./sermonsrss"

const parseSermon = (sermon: any): Sermon => {
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
          uri: process.env.GRAPHQL_ENDPOINT,
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

export const get: APIGatewayProxyHandler = async (_: any, _context) => {
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
