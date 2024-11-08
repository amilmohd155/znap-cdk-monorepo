import { DynamoDBAdapter } from "@auth/dynamodb-adapter";
import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocument,
  GetCommand,
  GetCommandInput,
  TransactWriteCommand,
} from "@aws-sdk/lib-dynamodb";
import { DEFAULT_ALIAS_LENGTH, nanoid, URL_LIFETIME_IN_MINUTES } from "./utils";

const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.AUTH_DYNAMODB_ID!,
    secretAccessKey: process.env.AUTH_DYNAMODB_SECRET!,
  },
  region: process.env.AUTH_DYNAMODB_REGION,
  ...(process.env.NODE_ENV === "development" && {
    endpoint: "http://localhost:8000",
  }),
};

const client = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});

const adapter = DynamoDBAdapter(client, {
  tableName: process.env.TABLE_NAME,
  partitionKey: "PK",
  sortKey: "SK",
});

export { client };

export default adapter;

type UrlItem = {
  PK: string;
  SK: string;
  GST1PK?: string;
  GST1SK?: string;
  shortCode: string;
  longUrl: string;
  createdAt: number;
  expires: number;
  userId?: string;
};

export async function createShortUrl(
  url: string,
  customAlias?: string,
  userId?: string
) {
  const shortCode = customAlias || nanoid(DEFAULT_ALIAS_LENGTH);
  const createdAt = Math.floor(Date.now() / 1000);
  const expires = Math.floor(Date.now() / 1000 + URL_LIFETIME_IN_MINUTES * 60);

  // TODO: check if url already exits ?
  // TODO: implement user association

  const transactionItems = [
    {
      Put: {
        TableName: process.env.TABLE_NAME,
        Item: {
          PK: `URL#${shortCode}`,
          SK: "DETAILS",
          GST1PK: `URL#${shortCode}`,
          GST1SK: `URL#${createdAt}`,
          shortCode,
          longUrl: url,
          createdAt,
          userId: userId || "anonymous",
          expires,
          // lastAccesed: createdAt,
        } as UrlItem,
        ConditionExpression: "attribute_not_exists(PK)",
      },
    },
  ];

  if (userId) {
    transactionItems.push({
      Put: {
        TableName: process.env.TABLE_NAME,
        Item: {
          PK: `USER#${userId}`,
          SK: `URL#${shortCode}`,
          GST1PK: `USER#${userId}`,
          GST1SK: `URL#${createdAt}`,
          shortCode,
          longUrl: url,
          createdAt,
        } as UrlItem,
        ConditionExpression:
          "attribute_not_exists(PK) AND attribute_not_exists(SK)",
      },
    });
  }

  const output = await client.send(
    new TransactWriteCommand({
      TransactItems: transactionItems,
    })
  );

  if (output.$metadata.httpStatusCode !== 200) {
    console.warn("createShortUrlDb:: ", output);
    throw new Error("Failed to create short url");
  }

  return shortCode;
}

export async function getUrlFromShortCode(shortCode: string) {
  const input: GetCommandInput = {
    TableName: process.env.TABLE_NAME,
    Key: {
      PK: `URL#${shortCode}`,
      SK: "DETAILS",
    },
    ProjectionExpression: "longUrl",
  };

  const output = await client.send(new GetCommand(input));

  if (output.$metadata.httpStatusCode !== 200 || !output.Item) {
    console.warn("getUrlFromShortCodeDb:: ", output);
    throw new Error("Failed to get url from short code");
  }

  console.log("getUrlFromShortCodeDb:: ", output.Item);

  return output.Item;
}
