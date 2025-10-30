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
  const session = await auth.api.getSession({ headers: await headers() });

  if(!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Access denied - Unauthorized", cause: "Authentication guard triggered: auth.api.getSession() returned null. Possible expired, revoked, or malformed session token." });
  return next({ ctx: { ...ctx, session: session } });
})