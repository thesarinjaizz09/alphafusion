
import { EquiFusionPage } from "@/pages-section";

export const metadata = {
  title: "EquiFusion",
  description: "EquiFusion is a comprehensive global equity intelligence dashboard providing real-time market data, indices, fundamentals, valuations, analyst ratings, and institutional flows. Analyze stocks and market trends with professional-grade insights inspired by Bloomberg-level analytics.",
};


export default function EquiFusionBoard() {
  return (
    <div className="rounded-sm overflow-hidden font-mono">
      <EquiFusionPage />
    </div >
  );
}
