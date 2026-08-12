// lib/liabilities-storage.ts
"use server";

import { readRaw, writeRaw, createPkg, PkgObject } from "@/lib/storage";
import { Payable, Installment, Debtor } from "@/types/liabilities";
import { CurrencyCode } from "@/lib/money";

const PKG = "passivos";

function ensurePkg(): PkgObject {
  try {
    return readRaw(PKG);
  } catch {
    const initial: PkgObject = { payables: [], installments: [], debtors: [] };
    createPkg(PKG, initial);
    return initial;
  }
}

// ─── Contas a pagar ─────────────────────────────────────────────────────────

export async function listPayables(): Promise<Payable[]> {
  const pkg = ensurePkg();
  return ((pkg.payables as unknown as Payable[]) ?? []).sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );
}

export async function addPayable(input: Omit<Payable, "id" | "createdAt">): Promise<Payable> {
  const pkg = ensurePkg();
  const payable: Payable = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  const current = (pkg.payables as unknown as Payable[]) ?? [];
  writeRaw(PKG, { ...pkg, payables: [payable, ...current] as unknown as PkgObject[string] });
  return payable;
}

// ─── Parcelamentos ──────────────────────────────────────────────────────────

export async function listInstallments(): Promise<Installment[]> {
  const pkg = ensurePkg();
  return (pkg.installments as unknown as Installment[]) ?? [];
}

export async function addInstallment(input: Omit<Installment, "id" | "createdAt">): Promise<Installment> {
  const pkg = ensurePkg();
  const installment: Installment = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  const current = (pkg.installments as unknown as Installment[]) ?? [];
  writeRaw(PKG, { ...pkg, installments: [installment, ...current] as unknown as PkgObject[string] });
  return installment;
}

// ─── Devedores (a receber de terceiros) ────────────────────────────────────

export async function listDebtors(): Promise<Debtor[]> {
  const pkg = ensurePkg();
  return ((pkg.debtors as unknown as Debtor[]) ?? []).filter((d) => !d.settled);
}

export async function addDebtor(input: Omit<Debtor, "id" | "createdAt" | "settled">): Promise<Debtor> {
  const pkg = ensurePkg();
  const debtor: Debtor = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString(), settled: false };
  const current = (pkg.debtors as unknown as Debtor[]) ?? [];
  writeRaw(PKG, { ...pkg, debtors: [debtor, ...current] as unknown as PkgObject[string] });
  return debtor;
}

export async function settleDebtor(id: string): Promise<void> {
  const pkg = ensurePkg();
  const debtors = ((pkg.debtors as unknown as Debtor[]) ?? []).map((d) =>
    d.id === id ? { ...d, settled: true } : d
  );
  writeRaw(PKG, { ...pkg, debtors: debtors as unknown as PkgObject[string] });
}

// ─── Total consolidado (para liabilities/all) ──────────────────────────────

export async function getTotalLiabilities(currency: CurrencyCode): Promise<number> {
  const [payables, installments] = await Promise.all([listPayables(), listInstallments()]);
  const payablesSum = payables
    .filter((p) => p.money.currency === currency && p.status !== "Pago")
    .reduce((s, p) => s + p.money.amount, 0);
  const installmentsSum = installments
    .filter((i) => i.remaining.currency === currency)
    .reduce((s, i) => s + i.remaining.amount, 0);
  return payablesSum + installmentsSum;
}