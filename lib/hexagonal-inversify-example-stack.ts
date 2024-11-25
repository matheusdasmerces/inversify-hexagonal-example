import { Stack, StackProps } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class HexagonalInversifyExampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new NodejsFunction(this, 'HelloWorldFunction', {
      entry: 'src/example-app/exampleAppHandlers.ts',
      handler: 'helloWorld',
    });
  }
}
