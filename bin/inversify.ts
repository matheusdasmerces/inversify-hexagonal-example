#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { InversifyStack } from '../lib/inversify-stack';

const app = new cdk.App();
new InversifyStack(app, 'InversifyStack');
