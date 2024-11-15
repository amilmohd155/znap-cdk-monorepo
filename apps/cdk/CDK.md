## CDK Stack Documentation

### Overview

The `CdkStack` class defines an AWS Cloud Development Kit (CDK) stack that sets up an Amazon DynamoDB table with secure, controlled access for a client IAM user. This setup includes a DynamoDB table with a global secondary index (GSI), a restricted IAM user, role-based access controls, and secure key management.

### Code Structure

#### Constructor

The `CdkStack` constructor initializes the stack with the configuration parameters passed in `props`. It performs the following steps to create and configure resources.

---

### Step-by-Step Breakdown

1. **Create the CDK Stack**
   This step initializes the CDK stack with necessary scope, ID, and properties, enabling resource creation and configuration within this stack.
2. **Create a DynamoDB Table**
   - A new DynamoDB table, named dynamically using the environment variable `TABLE_NAME`, is created with:
     - `PK` (partition key) and `SK` (sort key) of type `STRING`.
     - A `timeToLiveAttribute` field for automatic item expiration.
     - On-demand billing mode.
     - `DESTROY` removal policy for development purposes (recommended to change to `RETAIN` for production).
3. **Add a Global Secondary Index (GSI)**
   - Adds a GSI to the table to support additional query patterns, using `GSI1PK` as the partition key and `GSI1SK` as the sort key.
4. **Create a Client IAM User**
   - Defines an IAM user named `Znap-URL-DynamodbAcessUser` that will interact with the DynamoDB table.
5. **Create and Attach a DynamoDB Access Policy**
   - Creates a policy allowing the IAM user access to specific DynamoDB actions (`GetItem`, `PutItem`, etc.) on the created table.
   - This policy, `Znap-URL-DynamodbAccessPolicy`, is scoped strictly to the table's ARN.
6. **Create a Role for the IAM User with External ID**
   - A role, `Znap-URL-DynamodbAccessRole`, is created with the client IAM user ARN as the principal. The role includes an external ID (`config.EXTERNAL_ID`) for enhanced security.
   - The role allows the IAM user to access the DynamoDB table through controlled role assumptions.
7. **Create an Assume Role Policy for the IAM User**
   - A policy (`Znap-URL-AssumeRolePolicy`) is defined to allow the IAM user to assume the previously created role using the `sts:AssumeRole` action.
8. **Attach Assume Role Policy to the IAM User**
   - Attaches the assume role policy to the IAM user, enabling them to assume the specified role for table access.
9. **Generate an Access Key for the IAM User**
   - Creates an access key for the IAM user, enabling programmatic access to AWS resources through the access and secret keys.
10. **Create a Secret to Store Access Keys**
    - Stores the access keys (AWS Access Key ID and Secret Access Key) in AWS Secrets Manager, with the secret name `znap-url-secret`.
    - The removal policy is set to `DESTROY` for automatic deletion on stack removal.
11. **Grant GitHub Actions Role Access to the Secret**
    - Grants read-only access to the secret for a specified GitHub Actions role, defined by `config.AWS_ROLE_ARN`, allowing secure access to credentials within GitHub workflows.

---

### Configuration Properties

- **`config` (ConfigProps)**
  This contains configuration properties needed to create secure, environment-specific resources. Includes properties such as `EXTERNAL_ID` and `AWS_ROLE_ARN` for access control.
