"use server";
import { signIn as authSignIn } from "@/auth";

export async function signInAction(formData: FormData) {
  //   "use server";
  const providerId =
    (formData.get("providerId") as string) ??
    (() => {
      throw new Error("Missing providerId");
    })();

  try {
    await authSignIn(providerId, {
      redirectTo: "/",
    });
  } catch (error) {
    // if (error instanceof AuthError) {
    //   return "";
    // }
    console.log(error);
    throw error;
  }
}
