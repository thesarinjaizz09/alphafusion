"use client"

import * as React from "react"
import {
  Cpu, Globe, Users, BarChart2, Monitor, Shield, Library, MapPin, Bell, Edit,
  BookOpen,
  ChartCandlestick,
  LayoutDashboard
} from "lucide-react";
import { usePathname } from "next/navigation"
import Image from "next/image"
import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import appLogo from "@/public/Storx.final.png"


const data = {
  user: {
    name: "Your Name",
    email: "you@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Boards™",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        { title: "Fusion", url: "/fusionboards/fusionone" },
        { title: "MyBoard", url: "/fusionboards/myfusionboard" },
        { title: "Global", url: "/fusionboards/globalfusion" },
        { title: "Equities", url: "/fusionboards/equifusion" },
        { title: "Bonds", url: "/fusionboards/bondfusion" },
        { title: "Forex", url: "/fusionboards/forexfusion" },
        { title: "Commodities", url: "/fusionboards/commofusion" },
        { title: "Crypto", url: "/fusionboards/cryptofusion" },
        { title: "Derivatives", url: "/fusionboards/derivafusion" },
        { title: "Economics", url: "/fusionboards/ecofusion" },
        { title: "Shipping", url: "/fusionboards/shipfusion" },
        { title: "Assets", url: "/fusionboards/assetfusion" },
        { title: "News", url: "/fusionboards/newsfusion" },
      ],
    },
    {
      title: "Trade™",
      url: "#",
      icon: ChartCandlestick,
      items: [
        { title: "Station", url: "/fusiontrade/tradestation" },
        { title: "AutoPilot", url: "/fusiontrade/autopilot" },
        { title: "AlgoLab", url: "/fusiontrade/algolab" },
        { title: "OrderFlow", url: "/fusiontrade/orderflow" },
        { title: "FusionPort", url: "/fusiontrade/fusionport" },
        { title: "API Bridge", url: "/fusiontrade/apibridge" },
      ],
    },
    {
      title: "Analytics™",
      url: "#",
      icon: BarChart2,
      items: [
        { title: "QuantLens", url: "/fusionanalytics/quantlens" },
        { title: "Sentimatrix", url: "/fusionanalytics/sentimatrix" },
        { title: "DataGrid", url: "/fusionanalytics/datagrid" },
        { title: "FlowTrack", url: "/fusionanalytics/flowtrack" },
        { title: "TechScope", url: "/fusionanalytics/techscope" },
        { title: "MarketPulse", url: "/fusionanalytics/marketpulse" },
      ],
    },
    {
      title: "Intellect™",
      url: "#",
      icon: Cpu,
      items: [
        { title: "TradeShark", url: "/fusionintellect/tradeshark" },
        { title: "FusionMind", url: "/fusionintellect/fusionmind" },
        { title: "AlphaBrain", url: "/fusionintellect/alphabrain" },
        { title: "Predictive", url: "/fusionintellect/predictivepulse" },
        { title: "InsightMesh", url: "/fusionintellect/insightmesh" },
        { title: "AutoScript", url: "/fusionintellect/autoscript" },
      ],
    },
    {
      title: "Guard™",
      url: "#",
      icon: Shield,
      items: [
        { title: "RiskMatrix", url: "/fusionguard/riskmatrix" },
        { title: "CompliChain", url: "/fusionguard/complichain" },
        { title: "ThreatLens", url: "/fusionguard/threatlens" },
        { title: "GuardAI", url: "/fusionguard/guardai" },
        { title: "AuditTrail", url: "/fusionguard/audittrail" },
      ],
    },
    {
      title: "Research™",
      url: "#",
      icon: Library,
      items: [
        { title: "Assets", url: "/fusionresearch/stockintel" },
        { title: "Docs", url: "/fusionresearch/fusiondocs" },
        { title: "Events", url: "/fusionresearch/eventhorizon" },
        { title: "Fundamentals", url: "/fusionresearch/fundamenta" },
        { title: "GeoScope", url: "/fusionresearch/geoscope" },
        { title: "MacroMap", url: "/fusionresearch/macromap" },
        { title: "FusionPaper", url: "/fusionresearch/fusionpaper" },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/support",
      icon: Bell,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: Edit,
    },
    {
      title: "Documentation",
      url: "/docs",
      icon: BookOpen,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Monitor,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: Users,
    },
    {
      name: "Travel",
      url: "#",
      icon: MapPin,
    },
  ],
};



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const navMainWithActive = data.navMain.map((item) => {
    const subItemActive = item.items?.some((sub) => pathname === sub.url);

    return {
      ...item,
      isActive: pathname === item.url || subItemActive,
      items: item.items?.map((sub) => ({
        ...sub,
        isActive: pathname === sub.url,
      })),
    };
  });

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <Image src={appLogo} alt="AlphaFusion Trademark" width={30} className="p-1 border-none border-violet-800 rounded-sm bg-slate-800" />

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">AlphaFusion™</span>
                  <span className="truncate text-[11px]">Finance</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainWithActive} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
