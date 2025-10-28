"use client"
import { useState, useRef } from "react";
import { AppWindow, AppWindowMac, Braces, ChevronRight, Combine, EllipsisVertical, Mail, Menu, Sheet, SquaresExclude, TvMinimal, type LucideIcon } from "lucide-react"
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
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const [open, setOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    // Capture cursor position relative to viewport
    setCursorPos({ x: e.clientX, y: e.clientY });
    setOpen(true);
  };

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
                  <span className="text-[10px] ">{item.title}</span>
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
                        <DropdownMenu key={subItem.title}>
                          {/* Tooltip wraps around Dropdown trigger */}
                          <SidebarMenuSubItem key={subItem.title}>
                            <Link href={subItem.url} className="w-full">
                              <SidebarMenuSubButton asChild isActive={subItem.isActive}>

                                <span className="w-full flex items-center justify-between text-[9px]">{subItem.title}
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <DropdownMenuTrigger asChild>
                                        <EllipsisVertical className="w-3" style={{
                                          color: 'gray'
                                        }} />
                                      </DropdownMenuTrigger>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom" className="bg-[#0A0F1C]/95 border border-accent/30 text-gray-200 rounded-md p-2 text-[10px] shadow-lg min-w-[100px] max-w-[180px] whitespace-pre-wrap">
                                      Click for more actions!
                                    </TooltipContent>
                                  </Tooltip>

                                </span>
                              </SidebarMenuSubButton>
                            </Link>
                          </SidebarMenuSubItem>

                          {/* Dropdown menu itself */}
                          <DropdownMenuContent
                            side="bottom"
                            align="start"
                            className="text-[9px] w-40 bg-[#0A0F1C] text-gray-200 border-gray-700"
                          >
                            <DropdownMenuLabel className="text-[10px] text-accent">Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-gray-700" />
                            <DropdownMenuItem
                              className="flex items-center gap-2 hover:bg-primary cursor-pointer"
                            // onClick={onHelp}
                            >
                              <TvMinimal className="w-3 h-3 text-blue-400" />
                              Widget
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex items-center gap-2 hover:bg-primary cursor-pointer"
                            // onClick={onSettings}
                            >
                              <Mail className="w-3 h-3 text-blue-400" />
                              Subscribe
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex items-center gap-2 hover:bg-primary cursor-pointer"
                            // onClick={onHelp}
                            >
                              <AppWindowMac className="w-3 h-3 text-blue-400" />
                              New Window
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex items-center gap-2 hover:bg-primary cursor-pointer"
                            // onClick={onHelp}
                            >
                              <Combine className="w-3 h-3 text-blue-400" />
                              Merge Window
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>


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
