'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RiExchangeLine } from "react-icons/ri";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function AuthPage({
    className,
}: React.ComponentProps<"form">) {
    const router = useRouter()
    const [authMode, setAuthMode] = useState("signup")

    const handleAuthSuccess = () => {
        router.push('/dashboard')
    }

    return (
        <form className={cn("flex flex-col gap-6", className)}>
            <div className="flex flex-col items-start gap-1 text-left">
                {
                    authMode === 'signup' ? <><h1 className="text-3xl font-bold">Create Credentials</h1>
                        <p className="text-muted-foreground text-sm w-full">
                            Create your credentials to access the AlphaFusion Dashboard
                        </p></> : <><h1 className="text-3xl font-bold">Login Credentials</h1>
                        <p className="text-muted-foreground text-sm w-full">
                            Enter your credentials to access the AlphaFusion Dashboard
                        </p></>
                }
            </div>
            <div className="grid gap-6">
                {
                    authMode === 'signup' && <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input id="text" type="text" placeholder="Elon Musk" required />
                    </div>
                }
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        {
                            authMode === 'signin' && <a
                                href="#"
                                className="ml-auto text-sm underline-offset-4 hover:underline"
                            >
                                Forgot your password?
                            </a>
                        }
                    </div>
                    <Input id="password" type="password" required />
                </div>
                <Button onClick={() => handleAuthSuccess()} className="w-full cursor-pointer">
                    Dashboard<FaLongArrowAltRight />
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-background text-muted-foreground relative z-10 px-2">
                        Or continue with
                    </span>
                </div>
                <Button variant="outline" className="cursor-pointer w-full">
                    <RiExchangeLine />Authorize with Exchange
                </Button>
            </div>
            <div className="text-center text-sm">
                {
                    authMode === 'signin' ? <div className="flex items-center justify-center">Don&apos;t have credentials?{" "}
                        <p onClick={() => setAuthMode('signup')} className="ml-1 cursor-pointer underline underline-offset-4">
                            Sign up
                        </p></div> : <div className="flex items-center justify-center">Already have credentials?{" "}
                        <p onClick={() => setAuthMode('signin')} className="ml-1 cursor-pointer underline underline-offset-4">
                            Sign in
                        </p></div>
                }

            </div>
        </form>
    )
}
