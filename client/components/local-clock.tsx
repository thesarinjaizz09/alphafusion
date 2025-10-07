'use client'
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import cn from "clsx"; // optional but convenient for merging classes

interface LocalClockProps {
  className?: string;        // for the outer div
  badgeClassName?: string;   // for the Badge
  timeClassName?: string;    // optional for the time text
}

const LocalClock: React.FC<LocalClockProps> = ({
  className,
  badgeClassName,
  timeClassName,
}) => {
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString(); // formats according to user's locale
      setLocalTime(timeStr);
    };

    updateClock(); // show immediately
    const timer = setInterval(updateClock, 1000); // update every second
    return () => clearInterval(timer); // cleanup
  }, []);

  return (
    <div className={cn("text-xs text-gray-300 font-mono", className)}>
      <Badge variant="secondary" className={cn("text-xs font-medium", badgeClassName)}>
        🕒 <span className={timeClassName}>{localTime}</span>
      </Badge>
    </div>
  );
};

export default LocalClock;
