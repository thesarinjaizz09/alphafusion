import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prismaClient from "../db";

export const auth = betterAuth({
    database: prismaAdapter(prismaClient, {
        provider: 'postgresql'
    }),
    emailAndPassword: {
        enabled: true
    }
});