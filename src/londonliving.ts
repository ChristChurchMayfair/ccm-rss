import { APIGatewayProxyHandler } from "aws-lambda"
import "source-map-support/register"
import { createXml } from "./londonlivingrss"

export type Episode = {
    title: string
    mediaUrl: string
    description: string
    releaseDate: string
    durationInSeconds: number
}

function generateXml(): string {
    const episodes: Episode[] = [
        {
            title: "Performance & Pressure",
            mediaUrl:
                "https://s3-eu-west-1.amazonaws.com/media.christchurchmayfair.org/londonliving/Norman-10mins_v3.1.mp3",
            description:
                "Norman, a senior executive for an international energy company, speaks about the performance culture of the work place.",
            releaseDate: "2019-05-02T12:00:00.000+01:00",
            durationInSeconds: 762,
        },
        {
          title: "Control & Physical Safety",
          mediaUrl: "https://s3-eu-west-1.amazonaws.com/media.christchurchmayfair.org/londonliving/Connie-10mins_v2.mp3",
          description: "Connie speaks about our desire for personal control and the impact of insecurity on mental health.",
          releaseDate: "2019-05-09T00:00:00.001+01:00",
          durationInSeconds: 566
        },
        {
          title: "Self Fulfillment & Legacy",
          mediaUrl: "https://s3-eu-west-1.amazonaws.com/media.christchurchmayfair.org/londonliving/Jesse-10mins_v2.mp3",
          description: "Jesse, entrepreneur and business owner, speaks on the desire for fulfillment through personal success.",
          releaseDate: "2019-05-16T00:00:00.001+01:00",
          durationInSeconds: 526
        }
    ]
    return createXml(episodes, new Date())
}

export const get: APIGatewayProxyHandler = async (_: any, _context) => {
    const xml = generateXml()
    return {
        isBase64Encoded: false,
        statusCode: 200,
        headers: {
            "Content-Type": "application/rss+xml",
        },
        body: xml,
    }
}

export const head: APIGatewayProxyHandler = async (_: any, _context) => {
    const xml = generateXml()
    return {
        isBase64Encoded: false,
        statusCode: 200,
        headers: {
            "Content-Length": xml.length,
        },
    }
}
