"use client";

import { useState, useEffect } from "react";
import { getFinanceAnalytics, FinanceAnalytics } from "@/lib/finance-analytics";
import { CurrencyCode } from "@/lib/money";

export function useFinanceAnalytics(currency: CurrencyCode = "BRL") {
  const [data, setData] = useState<FinanceAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getFinanceAnalytics(currency).then((result) => {
      setData(result);
      setLoading(false);
    });
  }, [currency]);

  return { data, loading };
}