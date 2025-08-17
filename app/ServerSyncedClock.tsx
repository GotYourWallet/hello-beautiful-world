"use client";

import { useEffect, useRef, useState } from "react";

function fmt(d: Date) {
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export default function ServerSyncedClock({ serverEpochMs }: { serverEpochMs: number }) {
  const offsetMs = useRef<number>(0); // serverNow - clientNow
  const [display, setDisplay] = useState("…");

  useEffect(() => {
    // compute offset from the server time you already fetched on the server
    offsetMs.current = serverEpochMs - Date.now();
    setDisplay(fmt(new Date(Date.now() + offsetMs.current)));

    // optional: re-sync every minute by recomputing against a fresh client now
    const resyncId = setInterval(() => {
      offsetMs.current = serverEpochMs - Date.now();
    }, 60_000);

    return () => clearInterval(resyncId);
  }, [serverEpochMs]);

  useEffect(() => {
    const id = setInterval(() => {
      setDisplay(fmt(new Date(Date.now() + offsetMs.current)));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="font-mono">{display}</span>;
}