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
  const episodes:[Episode] = [
    {
      title: "Episode 1", 
      mediaUrl: "https://media.christchurchmayfair.org/asdf.mp3",
      description: "A description",
      releaseDate: "2019-04-29T12:00:00.000+01:00",
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