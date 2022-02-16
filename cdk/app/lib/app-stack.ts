import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Architecture, Function } from 'aws-cdk-lib/aws-lambda';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { LogRetention } from 'aws-cdk-lib/aws-logs';
import { RemovalPolicy } from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import * as path from 'path';

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const helloFunction = new NodejsFunction(this, 'helloFunction', {
      functionName: 'app-hello-function',
      architecture: Architecture.X86_64,
      entry: path.join(__dirname, '..', 'function', 'hello', 'index.ts'),
      currentVersionOptions: {
        removalPolicy: RemovalPolicy.RETAIN,
      },
      memorySize: 256,
      timeout: Duration.seconds(600),
      environment: {
        'TZ': 'Asia/Tokyo',
      },
    });

    const logRetention = new LogRetention(this, 'logRetention', {
      logGroupName: `/aws/lambda/${helloFunction.functionName}`,
      retention: RetentionDays.ONE_DAY,
    });
  }
}
