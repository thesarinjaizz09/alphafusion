'use client'
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import Image from "next/image";
import cn from "clsx";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { AppWindowMac, Braces, Mail, Sheet, SquarePlus, SquaresExclude } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LocalClockProps {
  className?: string;
  badgeClassName?: string;
  timeClassName?: string;
}

const LocalClock: React.FC<LocalClockProps> = ({
  className,
  badgeClassName,
  timeClassName,
}) => {
  const [localTime, setLocalTime] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string | null>(null);

  // Fetch user country via IP
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data.country_code) {
          setCountryCode(data.country_code.toLowerCase()); // flagcdn uses lowercase
        }
      } catch (err) {
        console.error("Error fetching user country:", err);
      }
    };
    fetchCountry();
  }, []);

  // Update clock every second
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString(); // user locale
      setLocalTime(timeStr);
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={cn("text-gray-300 font-mono flex items-center gap-2", className)}>
      <DropdownMenu>
        {/* Tooltip wraps around Dropdown trigger */}
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <SquarePlus
                className="w-5 h-5 cursor-pointer text-gray-400 hover:text-accent transition"
              />
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-[#0A0F1C]/95 border border-accent/30 text-gray-200 rounded-md p-2 text-[10px] shadow-lg min-w-[100px] max-w-[180px] whitespace-pre-wrap">
            {"Click for more options"}
          </TooltipContent>
        </Tooltip>

        {/* Dropdown menu itself */}
        <DropdownMenuContent
          side="bottom"
          align="end"
          className="text-[9px] w-40 bg-[#0A0F1C] text-gray-200 border-gray-700"
        >
          <DropdownMenuLabel className="text-[10px] text-accent">Window Actions</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-700" />
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
            <Sheet className="w-3 h-3 text-blue-400" />
            Link Sheets
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 hover:bg-primary cursor-pointer"
          // onClick={onHelp}
          >
            <AppWindowMac className="w-3 h-3 text-blue-400" />
            Add Widget
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 hover:bg-primary cursor-pointer"
          // onClick={onHelp}
          >
            <SquaresExclude className="w-3 h-3 text-blue-400" />
            Export CSV
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 hover:bg-primary cursor-pointer"
          // onClick={onHelp}
          >
            <Braces className="w-3 h-3 text-blue-400" />
            Export JSON
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {countryCode && (
        <Image
          src={`https://flagcdn.com/${countryCode}.svg`}
          alt="User country flag"
          width={25} height={25} className="rounded-xs border border-[#E3B341]"
        />
      )}
      <Badge variant="secondary" className={cn("text-[10px] font-medium flex items-center gap-1", badgeClassName)}>
        🕒 <span className={timeClassName}>{localTime}</span>
      </Badge>
    </div>
  );
};

export default LocalClock;
