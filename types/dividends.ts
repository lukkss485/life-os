// types/dividends.ts
import { Money } from "@/lib/money";

export type DividendType = "Dividendo" | "JCP" | "Bonificação" | "Rendimento";

export type Dividend = {
  id: string;
  ticker: string;
  sector?: string;
  type: DividendType;
  money: Money;
  paidAt: string; // ISO 8601
  createdAt: string;
};

export type WatchlistCompany = {
  id: string;
  ticker: string;
  sector: string;
  dividendYield: number; // ex: 11.2 (%)
  recommendation: "Forte Compra" | "Compra" | "Manter" | "Manter/Compra";
};