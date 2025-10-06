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
        { title: "FusionOne – Global Summary", url: "/fusionboards/fusionone" },
        { title: "MyFusionBoard – Custom Dashboard", url: "/fusionboards/myfusionboard" },
        { title: "GlobalFusion – World Markets", url: "/fusionboards/globalfusion" },
        { title: "EquiFusion – Equities & Securities", url: "/fusionboards/equifusion" },
        { title: "BondFusion – Fixed Income", url: "/fusionboards/bondfusion" },
        { title: "ForexFusion – Foreign Exchanges", url: "/fusionboards/forexfusion" },
        { title: "CommoFusion – Commodities", url: "/fusionboards/commofusion" },
        { title: "CryptoFusion – Crypto Assets", url: "/fusionboards/cryptofusion" },
        { title: "DerivaFusion – Derivatives", url: "/fusionboards/derivafusion" },
        { title: "EcoFusion – Economics", url: "/fusionboards/ecofusion" },
        { title: "ShipFusion – Global Shipping", url: "/fusionboards/shipfusion" },
        { title: "AssetFusion – Portfolios / Mutual Funds", url: "/fusionboards/assetfusion" },
        { title: "NewsFusion – Global News", url: "/fusionboards/newsfusion" },
      ],
    },
    {
      title: "FusionTrade™",
      url: "#",
      icon: ChartCandlestick,
      items: [
        { title: "TradeStation – Trading Terminal", url: "/fusiontrade/tradestation" },
        { title: "AutoPilot – AI Auto-Trader", url: "/fusiontrade/autopilot" },
        { title: "AlgoLab – Strategy Builder & Backtester", url: "/fusiontrade/algolab" },
        { title: "OrderFlow – Order Book Visualizer", url: "/fusiontrade/orderflow" },
        { title: "FusionPort – Portfolio Tracker", url: "/fusiontrade/fusionport" },
        { title: "API Bridge – Broker/API Integrator", url: "/fusiontrade/apibridge" },
      ],
    },
    {
      title: "FusionAnalytics™",
      url: "#",
      icon: BarChart2,
      items: [
        { title: "QuantLens – Quantitative Metrics", url: "/fusionanalytics/quantlens" },
        { title: "Sentimatrix – Sentiment Analysis", url: "/fusionanalytics/sentimatrix" },
        { title: "DataGrid – Data Warehouse Viewer", url: "/fusionanalytics/datagrid" },
        { title: "FlowTrack – Institutional Money Flow", url: "/fusionanalytics/flowtrack" },
        { title: "TechScope – Technical Indicator Scanner", url: "/fusionanalytics/techscope" },
        { title: "MarketPulse – Real-time Volatility Map", url: "/fusionanalytics/marketpulse" },
      ],
    },
    {
      title: "FusionIntellect™",
      url: "#",
      icon: Cpu,
      items: [
        { title: "TradeShark AI – Market Forecast Engine", url: "/fusionintellect/tradeshark" },
        { title: "FusionMind – AI Query Console", url: "/fusionintellect/fusionmind" },
        { title: "AlphaBrain – Personalized AI Advisor", url: "/fusionintellect/alphabrain" },
        { title: "PredictivePulse – Pattern Detection AI", url: "/fusionintellect/predictivepulse" },
        { title: "InsightMesh – AI Summarized Insights", url: "/fusionintellect/insightmesh" },
        { title: "AutoScript – AI Trading Script Generator", url: "/fusionintellect/autoscript" },
      ],
    },
    {
      title: "FusionGuard™",
      url: "#",
      icon: Shield,
      items: [
        { title: "RiskMatrix – Portfolio Risk Engine", url: "/fusionguard/riskmatrix" },
        { title: "CompliChain – Compliance Blockchain", url: "/fusionguard/complichain" },
        { title: "ThreatLens – Fraud Detection", url: "/fusionguard/threatlens" },
        { title: "GuardAI – Security & API Watchdog", url: "/fusionguard/guardai" },
        { title: "AuditTrail – Trade & User Activity Logs", url: "/fusionguard/audittrail" },
      ],
    },
    {
      title: "FusionResearch™",
      url: "#",
      icon: Library,
      items: [
        { title: "StockIntel – Reports, Filings, Statements", url: "/fusionresearch/stockintel" },
        { title: "FusionDocs – Reports, Filings, Statements", url: "/fusionresearch/fusiondocs" },
        { title: "EventHorizon – Calendar & Forecasts", url: "/fusionresearch/eventhorizon" },
        { title: "Fundamenta – Company Deep Dive", url: "/fusionresearch/fundamenta" },
        { title: "GeoScope – Geopolitical Risk Mapping", url: "/fusionresearch/geoscope" },
        { title: "MacroMap – Macro Data Visualizer", url: "/fusionresearch/macromap" },
        { title: "FusionPaper – AI-Generated Research", url: "/fusionresearch/fusionpaper" },
      ],
    },
    {
      title: "Future",
      url: "#",
      icon: Globe,
      items: [
        { title: "VoiceFusion – Voice Assistant (AI)", url: "/future/voicefusion" },
        { title: "FusionChain – Blockchain Settlement", url: "/future/fusionchain" },
        { title: "FusionLabs – Sandbox for AI Backtesting", url: "/future/fusionlabs" },
        { title: "QuantumFusion – Quantum Forecast Models", url: "/future/quantumfusion" },
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
