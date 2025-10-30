// lib/auth/use-auth-session.ts
"use client";

import { useEffect, useState } from "react";
import { getSession } from "@/lib/auth/client";

interface UseAuthSessionProps {
    session: any | null;
    isPending: boolean;
    error: string | null;
}

export function useAuthSession(): UseAuthSessionProps {
    const [session, setSession] = useState<any | null>(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        (async () => {
            try {
                const result = await getSession();
                if (isMounted) {
                    setSession(result ?? null);
                }
            } catch (err: any) {
                if (isMounted) setError(err.message || "Failed to fetch session");
            } finally {
                if (isMounted) setIsPending(false);
            }
        })();

        return () => {
            isMounted = false;
        };
    }, []);

    return { session, isPending, error };
}

// Example Usage

//   const { session, isPending } = useAuthSession();
//   const router = useRouter();

//   if (isPending) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
//         <span className="ml-2 text-sm text-muted-foreground">
//           Verifying session...
//         </span>
//       </div>
//     );
//   }

//   if (!session) {
//     router.push("/auth");
//     return null;
//   }