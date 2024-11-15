"use server";
import { signIn as authSignIn } from "@/auth";

import { redirect } from "next/navigation";

export async function signInAction(formData: FormData) {
  const providerId =
    (formData.get("providerId") as string) ??
    (() => {
      throw new Error("Missing providerId");
    })();

  let callbackUrl = "/";

  try {
    callbackUrl = await authSignIn(providerId, {
      redirectTo: "/",
      redirect: false,
    });
  } catch (error) {
    // if (error instanceof AuthError) {
    //   return "";
    // }
    console.log(error);
    throw error;
  } finally {
    redirect(callbackUrl);
  }
}
