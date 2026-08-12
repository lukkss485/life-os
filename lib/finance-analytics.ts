"use server";

import { listTransactions } from "@/lib/finance-storage";
import { fromMinorUnits, CurrencyCode } from "@/lib/money";

export type PerformancePoint = { date: string; value: number; type: "positive" | "negative" };

export type FinanceMode = 1 | 2 | 3;

export type FinanceAnalytics = {
  mode: FinanceMode;
  healthIndex: number; // 0-100
  performance: PerformancePoint[];
};

export async function getPerformanceData(currency: CurrencyCode): Promise<PerformancePoint[]> {
  const transactions = (await listTransactions()).filter((t) => t.money.currency === currency);
  const byDay = new Map<string, number>();

  for (const t of transactions) {
    const day = t.occurredAt.slice(0, 10);
    const signed = t.type === "expense" ? -t.money.amount : t.money.amount;
    byDay.set(day, (byDay.get(day) ?? 0) + signed);
  }

  return Array.from(byDay.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, amount]) => ({
      date: new Date(day).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      value: fromMinorUnits(Math.abs(amount), currency),
      type: amount >= 0 ? "positive" : "negative",
    }));
}

export async function getFinanceAnalytics(currency: CurrencyCode): Promise<FinanceAnalytics> {
  const transactions = (await listTransactions()).filter((t) => t.money.currency === currency);
  const performance = await getPerformanceData(currency);

  const income = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.money.amount, 0);
  const expenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.money.amount, 0);
  const total = income + expenses;

  // Índice de saúde: proporção de entradas sobre o movimento total. Sem transações, neutro (50).
  const healthIndex = total === 0 ? 50 : Math.round((income / total) * 100);

  // Faixas exatas pedidas: 100-75 -> modo 1, 75-25 -> modo 2, 25-0 -> modo 3
  const mode: FinanceMode = healthIndex >= 75 ? 1 : healthIndex >= 25 ? 2 : 3;

  return { mode, healthIndex, performance };
}