"use client";

import { useEffect, useState } from "react";

const STARTING_COUNT = 1847;
const DAY_START = new Date().setHours(0, 0, 0, 0);
const MS_PER_CALL = 47_000; // ~ a call every 47 seconds

export function LiveCallCounter({ className }: { className?: string }) {
  const [count, setCount] = useState(STARTING_COUNT);

  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - DAY_START;
      const todayAdded = Math.floor(elapsed / MS_PER_CALL);
      setCount(STARTING_COUNT + todayAdded);
    };
    tick();
    const id = setInterval(tick, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className} title="Calls answered by Bukwin today">
      {count.toLocaleString("en-US")}
    </span>
  );
}
