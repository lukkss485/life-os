"use server";

import { listTransactions } from "@/lib/finance-storage";
import { getTotalDividendsReceived } from "@/lib/dividends-storage";
import { listGoals, getGoalsByCategory } from "@/lib/goals-storage";
import { fromMinorUnits, CurrencyCode } from "@/lib/money";
import { Goal, CategoryBreakdown } from "@/types/goals";

export type WinMetrics = {
  goalsAchieved: number;
  savingsRecord: number; // maior saldo líquido mensal já registrado
  independencePercent: number; // % das saídas cobertas por dividendos
  goalsByCategory: CategoryBreakdown[];
  recentGoals: Goal[];
};

export async function getWinMetrics(currency: CurrencyCode = "BRL"): Promise<WinMetrics> {
  const [transactions, dividendsReceived, goals, goalsByCategory] = await Promise.all([
    listTransactions(),
    getTotalDividendsReceived(),
    listGoals(),
    getGoalsByCategory(),
  ]);

  const filtered = transactions.filter((t) => t.money.currency === currency);
  const byMonth = new Map<string, number>();

  for (const t of filtered) {
    const month = t.occurredAt.slice(0, 7);
    const signed = t.type === "expense" ? -t.money.amount : t.money.amount;
    byMonth.set(month, (byMonth.get(month) ?? 0) + signed);
  }

  const bestMonth = Math.max(0, ...Array.from(byMonth.values()));
  const totalExpenses = filtered
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.money.amount, 0);

  const independencePercent = totalExpenses === 0
    ? 0
    : Math.min(100, Math.round((dividendsReceived / totalExpenses) * 100));

  return {
    goalsAchieved: goals.length,
    savingsRecord: fromMinorUnits(bestMonth, currency),
    independencePercent,
    goalsByCategory,
    recentGoals: goals.slice(0, 5),
  };
}