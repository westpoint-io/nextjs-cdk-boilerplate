#!/usr/bin/env node
import { App } from '@aws-cdk/core';
import { Builder } from '@sls-next/lambda-at-edge';

import NextJSStack from '../stack/nextjs-project-stack';

const builder = new Builder('.', './next-build', { args: ['build'] });

builder
  .build(true)
  .then(() => {
    const app = new App();

    new NextJSStack(app, 'NextJS-Project-Boilerplate', {
      env: {
        region: 'us-east-1', // Change your region
      },
      analyticsReporting: true,
      description: 'NextJS Serverless CDK Construct Boilerplate',
    });
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
