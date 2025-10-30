import { createAuthClient } from "better-auth/react";
import { nextCookies } from "better-auth/next-js";

export const { signIn, signUp, signOut, useSession, getSession } =
  createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
    emailAndPassword: {
      enabled: true,
      autoSignIn: true
    },
    plugins: [nextCookies()],
  });