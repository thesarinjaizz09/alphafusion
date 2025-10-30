// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const PUBLIC_ROUTES = ["/", "/blog"];
const AUTH_ROUTES = ["/auth", "/create"];
const DASHBOARD_REDIRECT = process.env.NEXT_PUBLIC_AUTH_SUCCESS_REDIRECT_URL || "/boards"; // redirect here after login

export async function middleware(req: NextRequest) {
    const { nextUrl } = req;
    const path = nextUrl.pathname;

    const sessionCookie = getSessionCookie(req);
    const isLoggedIn = !!sessionCookie;

    const isPublic = PUBLIC_ROUTES.some((r) => path.startsWith(r));
    const isAuthRoute = AUTH_ROUTES.some((r) => path.startsWith(r));

    if (isAuthRoute && isLoggedIn) return NextResponse.redirect(new URL(DASHBOARD_REDIRECT, req.url))

    if (!isPublic && !isAuthRoute && !isLoggedIn) return NextResponse.redirect(new URL("/auth", req.url));

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};
