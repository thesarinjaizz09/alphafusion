'use client'
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";

const LocalClock = () => {
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString(); // formats according to user's locale
      setLocalTime(timeStr);
    };

    updateClock(); // show immediately
    const timer = setInterval(updateClock, 1000); // update every second

    return () => clearInterval(timer); // cleanup on unmount
  }, []);

  return (
    <div className="text-xs text-gray-300 font-mono">
      <Badge variant="secondary"
        className={`text-xs font-medium`}
      >
        🕒 {localTime}
      </Badge>
    </div>
  );
};

export default LocalClock;
