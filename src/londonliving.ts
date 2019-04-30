import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { createXml } from './londonlivingrss';

export type Episode = {
  title: string
  mediaUrl: string
  description: string
  releaseDate: string,
  durationInSeconds: number
}

function generateXml(): string {
  const episodes: Episode[] = [
    {
      title: "Performance & Pressure", 
      mediaUrl: "https://media.christchurchmayfair.org/asdf.mp3",
      description: "Norman, a senior executive for an international power company, speaks about the performance culture of the work place.",
      releaseDate: "2019-05-02T12:00:00.000+01:00",
      durationInSeconds: 10
    },
    {
      title: "Control & Physical Safety", 
      mediaUrl: "https://media.christchurchmayfair.org/asdf.mp3",
      description: "Connie speaks about our desire for personal control and the effects of mental health on our identity.",
      releaseDate: "2019-05-02T12:00:00.000+01:00",
      durationInSeconds: 10
    },
    {
      title: "Self Fulfillment & Legacy", 
      mediaUrl: "https://media.christchurchmayfair.org/asdf.mp3",
      description: "Jesse, entrepreneur and business owner, speaks on the desire for fulfillment through personal success.",
      releaseDate: "2019-05-02T12:00:00.000+01:00",
      durationInSeconds: 10
    }
  ]
  return createXml(episodes, new Date());
}

export const get: APIGatewayProxyHandler = async (_: any, _context) => {
  const xml = generateXml();
    return {
        isBase64Encoded: false,
        statusCode: 200,
        headers: {
            'Content-Type' : 'application/rss+xml'
        },
        body: xml,
    }
}