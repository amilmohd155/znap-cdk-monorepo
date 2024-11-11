import siteConfig from "@/config/site";
import { client as DynamoDBClient } from "@/lib/dynamodb";
import {
  DEFAULT_ALIAS_LENGTH,
  nanoid,
  URL_LIFETIME_IN_MINUTES,
} from "@/lib/utils";
import { UrlItem, UrlPutItem } from "@/types/url.types";
import {
  GetCommand,
  GetCommandInput,
  QueryCommand,
  TransactWriteCommand,
} from "@aws-sdk/lib-dynamodb";
import { revalidatePath } from "next/cache";

export async function getUrlFromShortCode(shortCode: string) {
  const input: GetCommandInput = {
    TableName: process.env.TABLE_NAME,
    Key: {
      PK: `URL#${shortCode}`,
      SK: "DETAILS",
    },
    ProjectionExpression: "longUrl,expires",
  };

  const output = await DynamoDBClient.send(new GetCommand(input));

  if (output.$metadata.httpStatusCode !== 200 || !output.Item) {
    return null;
  }

  return output.Item;
}

export async function createShortUrl(
  url: string,
  customAlias?: string,
  userId?: string
) {
  const shortCode = customAlias || nanoid(DEFAULT_ALIAS_LENGTH);
  const createdAt = Date.now();
  const expires = Math.floor(Date.now() / 1000 + URL_LIFETIME_IN_MINUTES * 60);

  // TODO: check if url already exits ?

  const transactionItems = [
    {
      Put: {
        TableName: process.env.TABLE_NAME,
        Item: {
          PK: `URL#${shortCode}`,
          SK: "DETAILS",
          GSI1PK: `URL#${shortCode}`,
          GSI1SK: `URL#${createdAt}`,
          shortCode,
          longUrl: url,
          createdAt,
          userId: userId || "anonymous",
          expires,
          // lastAccesed: createdAt,
        } as UrlPutItem,
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
          GSI1PK: `USER#${userId}`,
          GSI1SK: `URL#${createdAt}`,
          shortCode,
          longUrl: url,
          createdAt,
          expires,
        } as UrlPutItem,
        ConditionExpression:
          "attribute_not_exists(PK) AND attribute_not_exists(SK)",
      },
    });
  }

  const output = await DynamoDBClient.send(
    new TransactWriteCommand({
      TransactItems: transactionItems,
    })
  );

  if (output.$metadata.httpStatusCode !== 200) {
    console.warn("createShortUrlDb:: ", output);
    throw new Error("Failed to create short url");
  }

  revalidatePath("/history");

  return new URL(shortCode, siteConfig.url);
}

export async function getUserHistory(userId: string) {
  const result = await DynamoDBClient.send(
    new QueryCommand({
      TableName: process.env.TABLE_NAME,
      IndexName: "GSI1",
      KeyConditionExpression: "GSI1PK = :pk",
      ExpressionAttributeValues: {
        ":pk": `USER#${userId}`,
      },
      ProjectionExpression: "shortCode,longUrl,expires,createdAt",
      ScanIndexForward: false,
    })
  );

  if (result.$metadata.httpStatusCode !== 200) {
    console.warn("getUrlFromUser:: ", result);
    // * Possible change --> throw error || return null
    return null;
  }

  if (!result.Items || result.Items.length === 0) {
    return null;
  }

  return result.Items as UrlItem[];
}
