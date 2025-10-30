import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./server";

export const isAuthenticated = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if(!session) redirect("/auth");

    return session;
};

export const isNotAuthenticated = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if(session) redirect("/dashboard");
};