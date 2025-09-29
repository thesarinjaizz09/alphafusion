import React from "react";
import { Metadata } from "next"
import { GalleryVerticalEnd } from "lucide-react"
import appLogo from "@/public/Storx.final.png"
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
      <div className="bg-indigo-950 p-3">
        <div className="flex flex-col gap-4 p-6 md:p-10 bg-white w-full h-full rounded-sm">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium">
              <Image src={appLogo} alt="AlphaFusion Trademark" width={33} className="p-1 border-none border-violet-800 rounded-sm bg-gray-900" />
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate text-md">AlphaFusion</span>
                <span className="truncate text-xs">Finance</span>
              </div>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
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