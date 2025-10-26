import React from "react";
import { Metadata } from "next";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/sidebar/site-header";

export const metadata: Metadata = {
  title: {
    default: "AlphaFusion Terminal",
    template: "%s - AlphaFusion Terminal",
  },
  description:
    "AlphaFusion Terminal – Your all-in-one trading hub for stocks and crypto. Track live market data, analyze AI-powered forecasts, manage your portfolio, and execute trades seamlessly in one place.",
};

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="[--header-height:calc(--spacing(11.5))] bg-gradient-to-br from-[#000d08] via-[#001a10] to-[#000f09] text-green-100 antialiased backdrop-blur-2xl">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset className='max-h-[calc(100vh-(var(--spacing)*11.5))] overflow-y-scroll'>
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
