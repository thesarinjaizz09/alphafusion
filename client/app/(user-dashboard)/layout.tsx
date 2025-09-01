import React from "react";
import { Metadata } from "next";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar";

export const metadata: Metadata = {
  title: "Dashboard - AlphaFusion",
  description:
    "AlphaFusion Dashboard – Your all-in-one trading hub for stocks and crypto. Track live market data, analyze AI-powered forecasts, manage your portfolio, and execute trades seamlessly in one place.",
};

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
