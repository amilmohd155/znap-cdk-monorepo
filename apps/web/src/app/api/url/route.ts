import { NextRequest, NextResponse } from "next/server";
import { customAlphabet } from "nanoid";
import { client } from "@/lib/dynamodb";
import { PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";
import {
  DEFAULT_ALIAS_LENGTH,
  nanoid,
  URL_LIFETIME_IN_MINUTES,
} from "@/lib/utils";
import siteConfig from "@/config/site";

type CreateURLRequest = {
  longUrl: string;
  customAlias?: string;
};

// Shotenr API route
export async function POST(request: NextRequest) {
  try {
    const { longUrl, customAlias }: CreateURLRequest = await request.json();

    const validatedUrl = new URL(longUrl);

    const shortCode = customAlias || nanoid(DEFAULT_ALIAS_LENGTH);

    const commandInput: PutCommandInput = {
      TableName: process.env.TABLE_NAME,
      Item: {
        pk: `URL#${shortCode}`,
        sk: `URL#${shortCode}`,
        shortCode,
        longUrl: validatedUrl.href,
        createAt: Date.now(),
        expires: Math.floor(Date.now() / 1000 + URL_LIFETIME_IN_MINUTES * 60),
      },
    };

    const output = await client.send(new PutCommand(commandInput));

    console.log("Create route output:: ", output.Attributes);

    return NextResponse.json(
      { shortUrl: new URL(shortCode, siteConfig.url).href },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Error

    console.log("Create route error:: ", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: `${error.message || "Something went wrong"}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
