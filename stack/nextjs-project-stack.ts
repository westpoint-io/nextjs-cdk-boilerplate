import { Stack, Construct, StackProps } from '@aws-cdk/core';
import { Duration } from '@aws-cdk/core';
import { NextJSLambdaEdge } from '@sls-next/cdk-construct';
import { Runtime } from '@aws-cdk/aws-lambda';

export default class NextJSStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new NextJSLambdaEdge(this, 'NextJS-App', {
      serverlessBuildOutDir: './next-build',
      runtime: Runtime.NODEJS_12_X,
      memory: 1024,
      timeout: Duration.seconds(30),
      withLogging: true,
    });
  }
}
