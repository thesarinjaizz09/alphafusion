import { cache } from 'react';
import { initTRPC, TRPCError } from '@trpc/server';
import { auth } from '@/lib/auth/server';
import { headers } from 'next/headers';
export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: 'user_123' };
});

const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Access denied - Unauthorized", cause: "Authentication guard triggered: Session returned null. Possible expired, revoked, or malformed session token." });
    if (session.user.role === "ADMIN") throw new TRPCError({ code: "UNAUTHORIZED", message: "Access denied - Unauthorized", cause: "Authentication guard triggered: Session returned admin role." });

    return next({ ctx: { ...ctx, session: session } });
  } catch (error) {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Access denied - Internal server error", cause: "Authentication guard triggered: Failed to fetch session. Internal server error" });
  }
})