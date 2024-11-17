#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { getConfig } from "../lib/config";
import { CdkStage } from "../lib/cdk-stage";

const config = getConfig();

const app = new cdk.App();

// Create the preview stage
new CdkStage(app, "Prev", {
  config,
  stackName: "ZnapURLPreviewCdkStack",
  tags: {
    Preview: "true",
    ZnapURL: "true",
  },
});

// Create the production stage
new CdkStage(app, "Prod", {
  config,
  stackName: "ZnapURLCdkStack",
  tags: {
    Development: "true",
    ZnapURL: "true",
  },
});
