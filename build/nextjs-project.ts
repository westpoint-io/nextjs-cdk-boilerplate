#!/usr/bin/env node
import { App } from '@aws-cdk/core';
import { Builder } from '@sls-next/lambda-at-edge';

import NextJSStack from '../stack/nextjs-project-stack';
import { config } from 'dotenv';
import { cdkHelper } from '../@types/cdk';

config();

const app = new App();

const context: cdkHelper.cdkProps = app.node.tryGetContext(
  process.env.ENVIRONMENT || 'development',
);

const builder = new Builder('.', './next-build', {
  args: ['build'],
  env: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_API_URL: context.apiUrl,
    // RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
  },
});

builder
  .build(true)
  .then(() => {
    const stackName =
      process.env.ENVIRONMENT === 'development'
        ? 'NextJS-Testing-App-DEV'
        : 'NextJS-Testing-App';

    new NextJSStack(app, 'NextJS-Testing', {
      env: {
        region: 'us-east-1',
        account: process.env.CDK_DEFAULT_ACCOUNT,
      },
      analyticsReporting: true,
      description: 'NextJS Serverless CDK Construct Boilerplate',
      stackName,
    });
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
