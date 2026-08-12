// lib/dividends-storage.ts
"use server";

import { readRaw, writeRaw, createPkg, PkgObject } from "@/lib/storage";
import { Dividend, WatchlistCompany } from "@/types/dividends";

const PKG = "dividendos";

function ensurePkg(): PkgObject {
  try {
    return readRaw(PKG);
  } catch {
    const initial: PkgObject = { dividends: [], watchlist: [] };
    createPkg(PKG, initial);
    return initial;
  }
}

function getDividends(pkg: PkgObject): Dividend[] {
  return (pkg.dividends as unknown as Dividend[]) ?? [];
}

function getWatchlist(pkg: PkgObject): WatchlistCompany[] {
  return (pkg.watchlist as unknown as WatchlistCompany[]) ?? [];
}

export async function listDividends(): Promise<Dividend[]> {
  const pkg = ensurePkg();
  return getDividends(pkg).sort(
    (a, b) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime()
  );
}

export async function addDividend(input: Omit<Dividend, "id" | "createdAt">): Promise<Dividend> {
  const pkg = ensurePkg();
  const dividend: Dividend = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  writeRaw(PKG, { ...pkg, dividends: [dividend, ...getDividends(pkg)] as unknown as PkgObject[string] });
  return dividend;
}

export async function removeDividend(id: string): Promise<void> {
  const pkg = ensurePkg();
  const dividends = getDividends(pkg).filter((d) => d.id !== id);
  writeRaw(PKG, { ...pkg, dividends: dividends as unknown as PkgObject[string] });
}

/** Total recebido por mês (para o gráfico de dividends/all) */
export async function getDividendsByMonth(): Promise<{ month: string; valor: number }[]> {
  const dividends = await listDividends();
  const totals = new Map<string, number>();

  for (const d of dividends) {
    const monthKey = d.paidAt.slice(0, 7); // "YYYY-MM"
    totals.set(monthKey, (totals.get(monthKey) ?? 0) + d.money.amount);
  }

  return Array.from(totals.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([monthKey, amount]) => ({
      month: new Date(`${monthKey}-01`).toLocaleDateString("pt-BR", { month: "short" }),
      valor: amount / 100, // decimal, pra exibição direta no gráfico
    }));
}

export async function getTotalDividendsReceived(): Promise<number> {
  const dividends = await listDividends();
  return dividends.reduce((sum, d) => sum + d.money.amount, 0);
}

export async function listWatchlist(): Promise<WatchlistCompany[]> {
  return getWatchlist(ensurePkg());
}