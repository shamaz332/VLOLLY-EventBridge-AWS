#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { LollybackendStack } from '../lib/lollybackend-stack';

const app = new cdk.App();
new LollybackendStack(app, 'LollybackendStack');
