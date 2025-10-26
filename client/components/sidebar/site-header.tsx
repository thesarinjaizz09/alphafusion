"use client"

import { SidebarIcon } from "lucide-react"
import LocalClock from "../global/local-clock-widget"
import { SearchForm } from "../ui/search-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="sticky top-0 z-50 flex w-full items-center border-b bg-gradient-to-br from-[#000d08] via-[#001a10] to-[#000f09] text-green-100 antialiased backdrop-blur-2xl">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-1">
        <Button
          className="h-6 w-6"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList className="text-[#E3B341]/90 font-medium text-[10px] ">
            <BreadcrumbItem>
              <BreadcrumbPage className="text-[#E3B341]/90 font-semibold">
                Suite
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block text-[#E3B341]/50" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-[#F5F6FA] font-semibold">
                Service
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <SearchForm className="w-full md:min-w-xs sm:ml-auto sm:w-auto" />
        <LocalClock className="mr-2" />
      </div>
    </header>
  )
}
