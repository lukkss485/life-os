import { Money, CurrencyCode } from "@/lib/money";

export type TransactionType = "income" | "expense";
export type TransactionStatus = "Concluído" | "Pendente";

export type Transaction = {
  id: string;
  description: string;
  money: Money;
  category?: string;
  /** Momento real do evento financeiro — ISO 8601, com data E hora */
  occurredAt: string;
  /** Momento em que foi registrado no sistema (pode diferir de occurredAt) */
  createdAt: string;
  status: TransactionStatus;
  type: TransactionType;
};

export type CurrencySummary = {
  currency: CurrencyCode;
  totalBalance: Money;
  income: Money;
  expenses: Money;
};