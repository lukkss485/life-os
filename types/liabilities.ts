// types/liabilities.ts
import { Money } from "@/lib/money";

export type PayableStatus = "Pendente" | "Pago" | "Atrasado";

export type Payable = {
  id: string;
  description: string;
  money: Money;
  dueDate: string; // ISO
  status: PayableStatus;
  createdAt: string;
};

export type Installment = {
  id: string;
  store: string;
  item: string;
  currentInstallment: number;
  totalInstallments: number;
  remaining: Money;
  createdAt: string;
};

export type Debtor = {
  id: string;
  name: string;
  reason: string;
  money: Money;
  dueDate: string;
  settled: boolean;
  createdAt: string;
};