"use client";

import { useState, useEffect } from "react";
import { getWinMetrics, WinMetrics } from "@/lib/win-metrics";

export function useWinMetrics() {
  const [data, setData] = useState<WinMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWinMetrics("BRL").then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  return { data, loading };
}