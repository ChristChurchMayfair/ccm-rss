# CCM RSS Lambdas

This repo contains code which serves the CCM RSS feeds.

They are lambdas written in Typescript (like Javascript but with a Type system).

They are deployed using the Serverless framework: https://serverless.com

Serverless config is in `serverless.yml`

To invoke a function locally: `serverless invoke local --function sermons-rss`

To deploy a non-live dev version to AWS: `serverless deploy --stage dev`

To deploy a the production version to AWS: `serverless deploy --stage prod`

If you need AWS credentials please ask the adminstrator of this repo.
