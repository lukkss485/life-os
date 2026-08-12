// hooks/useFinanceStore.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { listTransactions, addTransaction, removeTransaction, getFinanceSummary, getChartData } from "@/lib/finance-storage";
import { Transaction, CurrencySummary } from "@/types/finance";
import { CurrencyCode } from "@/lib/money";

const DEFAULT_CURRENCY: CurrencyCode = "BRL";



export function useFinanceStore(currency: CurrencyCode = DEFAULT_CURRENCY) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<CurrencySummary[]>([]);
  const [chartData, setChartData] = useState<{ name: string; total: number }[]>([]);
  const [loading, setLoading] = useState(true);

  // AQUI — reload é declarado com useCallback
  const reload = useCallback(async () => {
    const [t, s, c] = await Promise.all([
      listTransactions(),
      getFinanceSummary(),
      getChartData(currency),
    ]);
    setTransactions(t);
    setSummary(s);
    setChartData(c);
    setLoading(false);
  }, [currency]);

  useEffect(() => {
    reload(); // chamado uma vez ao montar / quando currency muda
  }, [reload]);

  async function create(transaction: Omit<Transaction, "id" | "createdAt">) {
    await addTransaction(transaction);
    await reload(); // AQUI — chamado depois de criar, pra recarregar os dados
  }

  async function remove(id: string) {
    await removeTransaction(id);
    await reload(); // AQUI também
  }

  // Atalho conveniente: resumo só da moeda atual, se existir
  const currentSummary = summary.find((s) => s.currency === currency) ?? {
    currency,
    totalBalance: { amount: 0, currency },
    income: { amount: 0, currency },
    expenses: { amount: 0, currency },
  };

  return { transactions, summary, currentSummary, chartData, loading, create, remove };
}

