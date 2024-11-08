import NextAuth, { NextAuthConfig } from "next-auth";
import DynamoDBAdapter from "@/lib/dynamodb";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";

import type { Provider } from "next-auth/providers";

const providers: Provider[] = [Google, LinkedIn, GitHub];

const config: NextAuthConfig = {
  providers,
  pages: {
    signIn: "/login",
  },
  adapter: DynamoDBAdapter,
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    }
    return { id: provider.id, name: provider.name };
  })
  .filter((provider) => provider.id !== "credentials");
