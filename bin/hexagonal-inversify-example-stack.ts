#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { HexagonalInversifyExampleStack } from '../lib/hexagonal-inversify-example-stack';

const app = new cdk.App();
new HexagonalInversifyExampleStack(app, 'HexagonalInversifyExampleStack');
