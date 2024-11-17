import { StackProps } from "aws-cdk-lib";
import * as dotenv from "dotenv";
import path = require("path");

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

export type ConfigProps = {
  AWS_TABLE_NAME: string;
  AWS_EXTERNAL_ID: string;
  AWS_SECRET_NAME: string;
  AWS_DYNAMODB_USER: string;
  AWS_DYNAMODB_ROLE: string;
  AWS_DYNAMODB_POLICY: string;
  AWS_ASSUME_ROLE_POLICY: string;
  ACTIONS_ROLE_ARN: string;
};

export type CdkStackProps = { config: Readonly<ConfigProps> } & StackProps;

export const getConfig = (): ConfigProps => ({
  ACTIONS_ROLE_ARN: process.env.ACTIONS_ROLE_ARN!,
  AWS_TABLE_NAME: process.env.AWS_TABLE_NAME!,
  AWS_EXTERNAL_ID: process.env.AWS_EXTERNAL_ID!,
  AWS_SECRET_NAME: process.env.AWS_SECRET_NAME!,
  AWS_DYNAMODB_USER: process.env.AWS_DYNAMODB_USER!,
  AWS_DYNAMODB_ROLE: process.env.AWS_DYNAMODB_ROLE!,
  AWS_DYNAMODB_POLICY: process.env.AWS_DYNAMODB_POLICY!,
  AWS_ASSUME_ROLE_POLICY: process.env.AWS_ASSUME_ROLE_POLICY!,
});
