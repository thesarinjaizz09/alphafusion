
import { EquiFusionPage } from "@/pages-section";
import PanelTopbar from "@/components/panel-topbar";

export const metadata = {
  title: "EquiFusion",
  description: "EquiFusion is a comprehensive global equity intelligence dashboard providing real-time market data, indices, fundamentals, valuations, analyst ratings, and institutional flows. Analyze stocks and market trends with professional-grade insights inspired by Bloomberg-level analytics.",
};


export default function EquiFusionBoard() {
  return (
    <div className="rounded-lg overflow-hidden font-mono">
      {/* HEADER */}
      <PanelTopbar suite="Boards" service="Equities" />

      {/* MAIN CONTENT */}
      <EquiFusionPage />
    </div >
  );
}
