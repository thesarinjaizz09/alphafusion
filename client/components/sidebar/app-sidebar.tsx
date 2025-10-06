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
      title: "FusionBoards™",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        { title: "FusionOne", url: "/fusionboards/fusionone" },
        { title: "MyFusionBoard", url: "/fusionboards/myfusionboard" },
        { title: "GlobalFusion", url: "/fusionboards/globalfusion" },
        { title: "EquiFusion", url: "/fusionboards/equifusion" },
        { title: "BondFusion", url: "/fusionboards/bondfusion" },
        { title: "ForexFusion", url: "/fusionboards/forexfusion" },
        { title: "CommoFusion", url: "/fusionboards/commofusion" },
        { title: "CryptoFusion", url: "/fusionboards/cryptofusion" },
        { title: "DerivaFusion", url: "/fusionboards/derivafusion" },
        { title: "EcoFusion", url: "/fusionboards/ecofusion" },
        { title: "ShipFusion", url: "/fusionboards/shipfusion" },
        { title: "AssetFusion", url: "/fusionboards/assetfusion" },
        { title: "NewsFusion", url: "/fusionboards/newsfusion" },
      ],
    },
    {
      title: "FusionTrade™",
      url: "#",
      icon: ChartCandlestick,
      items: [
        { title: "TradeStation", url: "/fusiontrade/tradestation" },
        { title: "AutoPilot", url: "/fusiontrade/autopilot" },
        { title: "AlgoLab", url: "/fusiontrade/algolab" },
        { title: "OrderFlow", url: "/fusiontrade/orderflow" },
        { title: "FusionPort", url: "/fusiontrade/fusionport" },
        { title: "API Bridge", url: "/fusiontrade/apibridge" },
      ],
    },
    {
      title: "FusionAnalytics™",
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
      title: "FusionIntellect™",
      url: "#",
      icon: Cpu,
      items: [
        { title: "TradeShark", url: "/fusionintellect/tradeshark" },
        { title: "FusionMind", url: "/fusionintellect/fusionmind" },
        { title: "AlphaBrain", url: "/fusionintellect/alphabrain" },
        { title: "PredictivePulse", url: "/fusionintellect/predictivepulse" },
        { title: "InsightMesh", url: "/fusionintellect/insightmesh" },
        { title: "AutoScript", url: "/fusionintellect/autoscript" },
      ],
    },
    {
      title: "FusionGuard™",
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
      title: "FusionResearch™",
      url: "#",
      icon: Library,
      items: [
        { title: "StockIntel", url: "/fusionresearch/stockintel" },
        { title: "FusionDocs", url: "/fusionresearch/fusiondocs" },
        { title: "EventHorizon", url: "/fusionresearch/eventhorizon" },
        { title: "Fundamenta", url: "/fusionresearch/fundamenta" },
        { title: "GeoScope", url: "/fusionresearch/geoscope" },
        { title: "MacroMap", url: "/fusionresearch/macromap" },
        { title: "FusionPaper", url: "/fusionresearch/fusionpaper" },
      ],
    },
    {
      title: "Future",
      url: "#",
      icon: Globe,
      items: [
        { title: "VoiceFusion", url: "/future/voicefusion" },
        { title: "FusionChain", url: "/future/fusionchain" },
        { title: "FusionLabs", url: "/future/fusionlabs" },
        { title: "QuantumFusion", url: "/future/quantumfusion" },
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
                  <span className="truncate text-xs">Finance</span>
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
