// hooks/useLiabilities.ts
"use client";
import { useState, useEffect, useCallback } from "react";
import { listPayables, listInstallments, listDebtors, addPayable, addInstallment, addDebtor, settleDebtor, getTotalLiabilities } from "@/lib/liabilities-storage";
import { Payable, Installment, Debtor } from "@/types/liabilities";
import { CurrencyCode } from "@/lib/money";

export function useLiabilities(currency: CurrencyCode = "BRL") {
  const [payables, setPayables] = useState<Payable[]>([]);
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [debtors, setDebtors] = useState<Debtor[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    const [p, i, d, t] = await Promise.all([
      listPayables(), listInstallments(), listDebtors(), getTotalLiabilities(currency),
    ]);
    setPayables(p); setInstallments(i); setDebtors(d); setTotal(t);
    setLoading(false);
  }, [currency]);

  useEffect(() => { reload(); }, [reload]);

  return {
    payables, installments, debtors, total, loading,
    createPayable: async (p: Omit<Payable, "id" | "createdAt">) => { await addPayable(p); await reload(); },
    createInstallment: async (i: Omit<Installment, "id" | "createdAt">) => { await addInstallment(i); await reload(); },
    createDebtor: async (d: Omit<Debtor, "id" | "createdAt" | "settled">) => { await addDebtor(d); await reload(); },
    settle: async (id: string) => { await settleDebtor(id); await reload(); },
  };
}