import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class HexagonalInversifyExampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new NodejsFunction(this, 'DurableFunction', {
      entry: 'src/example-app/handlers.ts',
      handler: 'durableFunction',
      durableConfig: {
        executionTimeout: Duration.minutes(15),
        retentionPeriod: Duration.days(30)
      },
    });
  }
}
