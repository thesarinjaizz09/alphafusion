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

export default function FusionOnePage() {
  return (
    <div className="rounded-lg overflow-hidden">
      {/* HEADER */}
      <header className="flex h-16 shrink-0 items-center gap-2 bg-[#0A0F1C]/95 border-b border-[#E3B341]/30 shadow-md shadow-[#E3B341]/10 backdrop-blur-sm">
        <div className="flex items-center gap-2 px-4 text-[#F5F6FA]">
          <SidebarTrigger className="-ml-1 text-[#E3B341] hover:text-[#F5F6FA] transition-colors" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-[#E3B341]/40" />
          <Breadcrumb>
            <BreadcrumbList className="text-[#E3B341]/90 font-medium">
              <BreadcrumbItem className="hidden md:block">
                AlphaFusion
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block text-[#E3B341]/50" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#E3B341]/90 font-medium">
                  FusionBoards
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block text-[#E3B341]/50" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#F5F6FA] font-medium">
                  FusionOne
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 flex-col gap-4 p-4 bg-[#050914] text-[#F5F6FA] min-h-screen">
        {/* TOP SUMMARY BOX */}
        <div className="bg-[#10182A]/80 border border-[#E3B341]/30 rounded-2xl h-28 shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 transition-all backdrop-blur-md" />

        {/* GRID SECTION */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-[#16223B]/80 border border-[#E3B341]/20 aspect-video rounded-2xl hover:border-[#E3B341]/60 hover:shadow-lg hover:shadow-[#E3B341]/10 transition-all duration-300 backdrop-blur-sm"
            />
          ))}
        </div>

        {/* LARGE CONTENT SECTION */}
        <div className="bg-[#0D1426]/90 border border-[#E3B341]/20 min-h-[100vh] flex-1 rounded-2xl md:min-h-min shadow-inner shadow-[#E3B341]/10 backdrop-blur-md" />
      </div>
    </div>
  );
}
