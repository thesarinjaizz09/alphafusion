"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  TrendingUpDown
} from "lucide-react"
import { usePathname } from "next/navigation"
import { RiExchangeBoxLine, RiDashboardLine, RiRobot2Line } from "react-icons/ri"
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuChartCandlestick } from "react-icons/lu";
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
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: RiDashboardLine,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
        {
          title: "Stocks Dashboard",
          url: "/dashboard/stocks",
        },
        {
          title: "Crypto Dashboard",
          url: "/dashboard/crypto",
        },
      ],
    },
    {
      title: "AlphaVision",
      url: "#",
      icon: LuChartCandlestick,
      items: [
        {
          title: "Stocks AlphaVision",
          url: "/alphavision/stocks",
        },
        {
          title: "Crypto AlphaVision",
          url: "/alphavision/crypto",
        }
      ],
    },
    {
      title: "AlphaTrader",
      url: "#",
      icon: RiRobot2Line,
      items: [
        {
          title: "Stocks AlphaTrader",
          url: "/alphatrader/stocks",
        },
        {
          title: "Crypto AlphaTrader",
          url: "/alphatrader/crypto",
        }
      ],
    },
    {
      title: "Configuration",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "AlphaVision Configs",
          url: "/configuration/alphavision",
        },
        {
          title: "AlphaTrader Configs",
          url: "/configuration/alphatrader",
        },
      ],
    },
    {
      title: "AlphaExchange",
      url: "#",
      icon: RiExchangeBoxLine,
      items: [
        {
          title: "Market Headlines",
          url: "/alphaexchange/market",
        },
        {
          title: "Stocks AlphaExchange",
          url: "/alphaexchange/stocks",
        },
        {
          title: "Crypto AlphaExchange",
          url: "/alphaexchange/crypto",
        },

      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: IoDocumentTextOutline,
      items: [
        {
          title: "Introduction",
          url: "/documentation/intro",
        },
        {
          title: "Get Started",
          url: "/documentation/started",
        },
        {
          title: "Tutorials",
          url: "/documentation/tutorial",
        },
        {
          title: "Changelog",
          url: "/documentation/changelog",
        },
      ],
    },

  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  console.log({pathname})
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
  console.log({navMainWithActive})
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <Image src={appLogo} alt="AlphaFusion Trademark" width={30} className="p-1 border-none border-violet-800 rounded-sm bg-slate-800" />

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">AlphaFusion</span>
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
