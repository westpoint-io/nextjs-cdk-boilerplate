import { Stack, Construct, StackProps } from '@aws-cdk/core';
import { Duration } from '@aws-cdk/core';
import { NextJSLambdaEdge } from '@sls-next/cdk-construct';
import { Runtime } from '@aws-cdk/aws-lambda';
import { config } from 'dotenv';

config();

export default class NextJSStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const stackName =
      process.env.ENVIRONMENT === 'development'
        ? 'NextJS-<stack_name>-App-DEV'
        : 'NextJS-<stack_name>-App';

    new NextJSLambdaEdge(this, 'NextJS-App', {
      serverlessBuildOutDir: './next-build',
      runtime: Runtime.NODEJS_12_X,
      memory: 1024,
      timeout: Duration.seconds(30),
      withLogging: true,
      cachePolicyName: {
        imageCache:
          process.env.ENVIRONMENT === 'development'
            ? 'NextJS-<stack_name>-ImageCache-DEV'
            : 'NextJS-<stack_name>-ImageCache',
        lambdaCache:
          process.env.ENVIRONMENT === 'development'
            ? 'NextJS-<stack_name>-LambdaCache-DEV'
            : 'NextJS-<stack_name>-LambdaCache',
        staticsCache:
          process.env.ENVIRONMENT === 'development'
            ? 'NextJS-<stack_name>-StaticsCache-DEV'
            : 'NextJS-<stack_name>-StaticsCache',
      },
    });
  }
}
