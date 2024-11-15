import { Stage } from "aws-cdk-lib";
import { Construct } from "constructs";
import { CdkStackProps } from "./config";
import { CdkStack } from "./cdk-stack";

export class CdkStage extends Stage {
  constructor(scope: Construct, id: string, props?: CdkStackProps) {
    super(scope, id, props);

    new CdkStack(this, "ZnapURLCdkStack", {
      stackName: "ZnapURLCdkStack",
      config: props?.config!,
    });
  }
}
