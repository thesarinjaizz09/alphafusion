import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import LocalClock from "@/components/local-clock";

type PanelTopbarProps = {
    suite: string;
    service: string;
}

const PanelTopbar = ({ suite, service }: PanelTopbarProps) => {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between bg-[#0A0F1C]/95 border-b border-[#E3B341]/30 shadow-md shadow-[#E3B341]/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 px-4 text-[#F5F6FA]">
                <SidebarTrigger className="-ml-1 text-[#E3B341] hover:text-[#F5F6FA] transition-colors" />
                <Separator orientation="vertical" className="mr-2 h-4 bg-[#E3B341]/40" />
                <Breadcrumb className="">
                    <BreadcrumbList className="text-[#E3B341]/90 font-medium text-[10px] ">
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-[#E3B341]/90 font-medium">
                                {suite}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block text-[#E3B341]/50" />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-[#F5F6FA] font-medium">
                                {service}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <LocalClock className="mr-5" />
        </header>
    )
}

export default PanelTopbar