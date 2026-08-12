// hooks/useDividends.ts
"use client";
import { useState, useEffect, useCallback } from "react";
import { listDividends, addDividend, removeDividend, getDividendsByMonth, listWatchlist } from "@/lib/dividends-storage";
import { Dividend, WatchlistCompany } from "@/types/dividends";

export function useDividends() {
  const [dividends, setDividends] = useState<Dividend[]>([]);
  const [byMonth, setByMonth] = useState<{ month: string; valor: number }[]>([]);
  const [watchlist, setWatchlist] = useState<WatchlistCompany[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    const [d, m, w] = await Promise.all([listDividends(), getDividendsByMonth(), listWatchlist()]);
    setDividends(d);
    setByMonth(m);
    setWatchlist(w);
    setLoading(false);
  }, []);

  useEffect(() => { reload(); }, [reload]);

  async function create(dividend: Omit<Dividend, "id" | "createdAt">) {
    await addDividend(dividend);
    await reload();
  }

  async function remove(id: string) {
    await removeDividend(id);
    await reload();
  }

  return { dividends, byMonth, watchlist, loading, create, remove };
}