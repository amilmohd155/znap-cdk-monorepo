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
  tags: {
    Preview: "true",
    ZnapURL: "true",
  },
});

// Create the production stage
new CdkStage(app, "Prod", {
  config,
  tags: {
    Development: "true",
    ZnapURL: "true",
  },
});
