// types/goals.ts
export type Goal = {
  id: string;
  title: string;
  description?: string;
  achievedAt: string; // ISO — quando foi batida
  category: "poupanca" | "dividendos" | "reserva" | "outro";
};

// types/goals.ts — adicionar
export type CategoryBreakdown = { name: string; value: number };