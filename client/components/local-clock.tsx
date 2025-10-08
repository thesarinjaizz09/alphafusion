'use client'
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import Image from "next/image";
import cn from "clsx";

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
