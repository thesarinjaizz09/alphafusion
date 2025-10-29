import React from "react";
import { Metadata } from "next"
import { GalleryVerticalEnd } from "lucide-react"
import appLogo from "@/public/alphafusion.png"
import Image from "next/image";


export const metadata: Metadata = {
  title: "Auth - AlphaFusion",
  description: "Sign up/Log in for AlphaFusion – the AI-powered trading platform for stocks and crypto. Get real-time forecasts, actionable signals, and autonomous trading for smarter investments."
}

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="p-3">
        <div className="flex flex-col gap-4 p-6 md:p-10 w-full h-full rounded-sm">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium">
              <Image src={appLogo} alt="AlphaFusion Corporation" width={32} className="p-1 border-none rounded-sm bg-primary" />
              <div className="grid flex-1 text-left leading-tight text-primary-foreground">
                <span className="truncate text-md text-primary-foreground">AlphaFusion</span>
                <span className="truncate text-xs text-gray-400">Finance</span>
              </div>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full">
              {children}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <video
          src="/backgrounds/auth.bg.3.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />

      </div>
    </div>
  )
}

export default AuthLayout