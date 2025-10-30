'use server'

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./server";

export const isAuthenticated = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) redirect("/auth");

        if (session.user.role === "ADMIN") redirect(process.env.NEXT_PUBLIC_UNAUTHORIZED_REDIRECT_URL || "/unauth");

        return session;
    } catch (error) {
        redirect("/auth");
    }
};

export const isNotAuthenticated = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (session) {
            if (session.user.role === "ADMIN") redirect(process.env.NEXT_PUBLIC_UNAUTHORIZED_REDIRECT_URL || "/unauth");
            redirect(process.env.NEXT_PUBLIC_AUTH_SUCCESS_REDIRECT_URL || "/boards");
        }

    } catch (error) {
        console.error(error);
    }
};