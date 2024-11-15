import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { CdkStackProps } from "./config";
import {
  AccessKey,
  ArnPrincipal,
  Effect,
  Policy,
  PolicyStatement,
  Role,
  User,
} from "aws-cdk-lib/aws-iam";
import { AttributeType, Billing, TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";

const timeToLiveAttribute = "expires" as const;

export class CdkStack extends cdk.Stack {
  // 1. Create the stack ✅
  constructor(scope: Construct, id: string, props: CdkStackProps) {
    super(scope, id, props);

    const { config } = props;

    // 2. Create a new table ✅
    const table = new TableV2(this, "znap-url-dynamodb", {
      tableName: process.env.TABLE_NAME,
      partitionKey: {
        name: "PK",
        type: AttributeType.STRING,
      },
      sortKey: {
        name: "SK",
        type: AttributeType.STRING,
      },
      timeToLiveAttribute,
      billing: Billing.onDemand(),
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production
    });

    // 3. Add a global secondary index ✅
    table.addGlobalSecondaryIndex({
      indexName: "GSI1",
      partitionKey: {
        name: "GSI1PK",
        type: AttributeType.STRING,
      },
      sortKey: {
        name: "GSI1SK",
        type: AttributeType.STRING,
      },
    });

    // 4. Create a client iam user ✅
    const user = new User(this, "DynamodbAccessUser", {
      userName: "Znap-URL-DynamodbAcessUser",
    });

    // 5. Create a policy to allow access the table using table arn ✅
    const dynamodbAccessPolicy = new Policy(this, "dynamodbAccessPolicy", {
      policyName: "Znap-URL-DynamodbAccessPolicy",
      statements: [
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: [
            "dynamodb:GetItem",
            "dynamodb:PutItem",
            "dynamodb:UpdateItem",
            "dynamodb:DeleteItem",
            "dynamodb:Query",
            "dynamodb:Scan",
          ],
          resources: [table.tableArn],
        }),
      ],
    });

    // 6. Create a role with the client iam user arn as principal and externalID (added security) ✅
    const dynamodbAccessRole = new Role(this, "DynamodbAccessRole", {
      roleName: "Znap-URL-DynamodbAccessRole",
      assumedBy: new ArnPrincipal(user.userArn),
      externalIds: [config.EXTERNAL_ID],
    });

    // attach the policy from step 5 ✅
    dynamodbAccessPolicy.attachToRole(dynamodbAccessRole);

    // 7. Create a policy that allows the user to assume the role (using sts) in step 6 with the role arn ✅
    const assumeRolePolicy = new Policy(this, "AssumeRolePolicy", {
      policyName: "Znap-URL-AssumeRolePolicy",
      statements: [
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ["sts:AssumeRole"],
          resources: [dynamodbAccessRole.roleArn],
        }),
      ],
    });

    // 8. Attach the policy from step 7 to the client iam user ✅
    assumeRolePolicy.attachToUser(user);

    // 9. Create a accesskey for the client iam user
    const accessKey = new AccessKey(this, "AccessKey", {
      user,
    });

    // 10. Create a secret for the accesskey ✅
    const templatedSecret = new Secret(this, "TemplatedSecret", {
      secretName: "znap-url-secret",
      secretObjectValue: {
        AWS_ACCESS_KEY_ID: cdk.SecretValue.unsafePlainText(
          accessKey.accessKeyId
        ),
        AWS_SECRET_ACCESS_KEY: accessKey.secretAccessKey,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // 11. Allow the role from github action to read the secret ✅
    templatedSecret.grantRead(new ArnPrincipal(config.AWS_ROLE_ARN));
  }
}
