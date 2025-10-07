"use client";

import { useEffect, useState } from "react";
import moment from "moment-timezone";

export default function LocalClock({ timezone }: { timezone: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      setTime(moment().tz(timezone).format("HH:mm:ss"));
    };

    updateClock(); // initial render
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="text-xs font-mono text-gray-400 mt-1">
      Local Time: <span className="text-green-400">{time}</span> ({timezone})
    </div>
  );
}
