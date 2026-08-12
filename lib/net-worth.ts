// lib/net-worth.ts
"use server";


import { getFinanceSummary } from "@/lib/finance-storage";
import { getTotalDividendsReceived } from "@/lib/dividends-storage";
import { getTotalLiabilities } from "@/lib/liabilities-storage";
import { CurrencyCode } from "@/lib/money";

export type NetWorth = {
  currency: CurrencyCode;
  liquidBalance: number;   // saldo de transações (entradas - saídas)
  dividendsReceived: number;
  totalLiabilities: number;
  netWorth: number;        // liquidBalance + dividendsReceived - totalLiabilities
};

export async function getNetWorth(currency: CurrencyCode = "BRL"): Promise<NetWorth> {
  const [summaries, dividendsReceived, totalLiabilities] = await Promise.all([
    getFinanceSummary(),
    getTotalDividendsReceived(),
    getTotalLiabilities(currency),
  ]);

  const summary = summaries.find((s) => s.currency === currency);
  const liquidBalance = summary?.totalBalance.amount ?? 0;

  return {
    currency,
    liquidBalance,
    dividendsReceived,
    totalLiabilities,
    netWorth: liquidBalance + dividendsReceived - totalLiabilities,
  };
}