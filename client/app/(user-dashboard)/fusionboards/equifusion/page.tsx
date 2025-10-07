import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { EquiFusionPage } from "@/pages-section";
import LocalClock from "@/components/local-clock";

export const metadata = {
  title: "EquiFusion",
  description: "EquiFusion is a comprehensive global equity intelligence dashboard providing real-time market data, indices, fundamentals, valuations, analyst ratings, and institutional flows. Analyze stocks and market trends with professional-grade insights inspired by Bloomberg-level analytics.",
};


export default function EquiFusionBoard() {
  return (
    <div className="rounded-lg overflow-hidden font-mono">
      {/* HEADER */}
      <header className="flex h-16 shrink-0 items-center gap-2 bg-[#0A0F1C]/95 border-b border-[#E3B341]/30 shadow-md shadow-[#E3B341]/10 backdrop-blur-sm">
        <div className="flex items-center gap-2 px-4 text-[#F5F6FA]">
          <SidebarTrigger className="-ml-1 text-[#E3B341] hover:text-[#F5F6FA] transition-colors" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-[#E3B341]/40" />
          <Breadcrumb className="">
            <BreadcrumbList className="text-[#E3B341]/90 font-medium text-xs">
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#E3B341]/90 font-medium">
                  FusionBoards
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block text-[#E3B341]/50" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#F5F6FA] font-medium">
                  EquiFusion
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <LocalClock />
      </header>

      {/* MAIN CONTENT */}
      <EquiFusionPage />
    </div >
  );
}
