#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CdkStack } from "../lib/cdk-stack";
import { getConfig } from "../lib/config";
import { CdkStage } from "../lib/cdk-stage";

const config = getConfig();

const app = new cdk.App();

// Create the preview stage
new CdkStage(app, "Prev", {
  config,
});

// Create the production stage
new CdkStack(app, "Prod", {
  config,
});
