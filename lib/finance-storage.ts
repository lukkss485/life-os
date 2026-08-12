"use server";

import { readRaw, writeRaw, createPkg, PkgObject } from "@/lib/storage";
import { Transaction, CurrencySummary } from "@/types/finance";
import { CurrencyCode } from "@/lib/money";


const FINANCE_PKG = "financas";

function ensurePkg(): PkgObject {
  try {
    return readRaw(FINANCE_PKG);
  } catch {
    const initial: PkgObject = { transactions: [] };
    createPkg(FINANCE_PKG, initial);
    return initial;
  }
}

// finance-storage.ts
function getTransactions(pkg: PkgObject): Transaction[] {
  const raw = (pkg.transactions as unknown as Transaction[]) ?? [];
  return raw.filter((t): t is Transaction => t?.money?.currency != null);
}

export async function listTransactions(): Promise<Transaction[]> {
  return getTransactions(ensurePkg()).sort(
    (a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime()
  );
}

export async function addTransaction(
  input: Omit<Transaction, "id" | "createdAt">
): Promise<Transaction> {
  const pkg = ensurePkg();
  const transactions = getTransactions(pkg);
  const transaction: Transaction = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  writeRaw(FINANCE_PKG, {
    ...pkg,
    transactions: [transaction, ...transactions] as unknown as PkgObject[string],
  });

  return transaction;
}

export async function removeTransaction(id: string): Promise<void> {
  const pkg = ensurePkg();
  const transactions = getTransactions(pkg).filter((t) => t.id !== id);
  writeRaw(FINANCE_PKG, { ...pkg, transactions: transactions as unknown as PkgObject[string] });
}

/** Resumo separado por moeda — nunca soma R$ com US$ */
export async function getFinanceSummary(): Promise<CurrencySummary[]> {
  const transactions = await listTransactions();
  const byCurrency = new Map<CurrencyCode, { income: number; expenses: number }>();

  for (const t of transactions) {
    const entry = byCurrency.get(t.money.currency) ?? { income: 0, expenses: 0 };
    if (t.type === "income") entry.income += t.money.amount;
    else entry.expenses += t.money.amount;
    byCurrency.set(t.money.currency, entry);
  }

  return Array.from(byCurrency.entries()).map(([currency, { income, expenses }]) => ({
    currency,
    income: { amount: income, currency },
    expenses: { amount: expenses, currency },
    totalBalance: { amount: income - expenses, currency },
  }));
}

/** Gráfico agrupado por dia (não mais por rótulo "Hoje"/"Ontem"), filtrado por moeda */
export async function getChartData(currency: CurrencyCode) {
  const transactions = (await listTransactions()).filter((t) => t.money.currency === currency);
  const totals = new Map<string, number>();

  for (const t of transactions) {
    const day = t.occurredAt.slice(0, 10); // "YYYY-MM-DD"
    const signed = t.type === "expense" ? -t.money.amount : t.money.amount;
    totals.set(day, (totals.get(day) ?? 0) + signed);
  }

  return Array.from(totals.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, total]) => ({ name, total }));
}

