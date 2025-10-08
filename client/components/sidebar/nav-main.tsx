"use client"

import { AppWindow, ChevronRight, type LucideIcon } from "lucide-react"
import Link from "next/link"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: React.ElementType
    isActive?: boolean
    items?: {
      title: string
      url: string
      isActive?: boolean
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Suite</SidebarGroupLabel>
      <SidebarMenu >
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title}>
                <a href={item.url}>
                  <item.icon />
                  <span className="text-[11px] ">{item.title}</span>
                </a>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <ContextMenu key={subItem.url}>

                          <ContextMenuContent>
                            <ContextMenuItem>Widget</ContextMenuItem>
                            <ContextMenuItem>Subscribe</ContextMenuItem>
                            <ContextMenuItem>Create Window</ContextMenuItem>
                            <ContextMenuItem>Merge Window</ContextMenuItem>
                          </ContextMenuContent>
                          <SidebarMenuSubItem key={subItem.title}>
                            <Link href={subItem.url} className="w-full">
                              <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                                <ContextMenuTrigger className="w-full">

                                  <span className="w-full flex items-center justify-between text-[10px]">{subItem.title}
                                    <AppWindow className="w-3" />
                                  </span>
                                </ContextMenuTrigger>
                              </SidebarMenuSubButton>
                            </Link>
                          </SidebarMenuSubItem>
                        </ContextMenu>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
