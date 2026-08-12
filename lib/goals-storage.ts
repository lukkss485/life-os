// lib/goals-storage.ts
"use server";

import { readRaw, writeRaw, createPkg, PkgObject } from "@/lib/storage";
import { Goal } from "@/types/goals";

const PKG = "metas";

function ensurePkg(): PkgObject {
  try { return readRaw(PKG); }
  catch { const initial: PkgObject = { goals: [] }; createPkg(PKG, initial); return initial; }
}

export async function listGoals(): Promise<Goal[]> {
  const pkg = ensurePkg();
  return ((pkg.goals as unknown as Goal[]) ?? []).sort(
    (a, b) => new Date(b.achievedAt).getTime() - new Date(a.achievedAt).getTime()
  );
}

export async function addGoal(input: Omit<Goal, "id">): Promise<Goal> {
  const pkg = ensurePkg();
  const goal: Goal = { ...input, id: crypto.randomUUID() };
  const current = (pkg.goals as unknown as Goal[]) ?? [];
  writeRaw(PKG, { ...pkg, goals: [goal, ...current] as unknown as PkgObject[string] });
  return goal;
}

// adicionar a este arquivo existente
import { CategoryBreakdown } from "@/types/goals";

const CATEGORY_LABELS: Record<Goal["category"], string> = {
  poupanca: "Poupança",
  dividendos: "Dividendos",
  reserva: "Reserva",
  outro: "Outro",
};

export async function getGoalsByCategory(): Promise<CategoryBreakdown[]> {
  const goals = await listGoals();
  const counts = new Map<Goal["category"], number>();

  for (const g of goals) {
    counts.set(g.category, (counts.get(g.category) ?? 0) + 1);
  }

  return Array.from(counts.entries()).map(([category, count]) => ({
    name: CATEGORY_LABELS[category],
    value: count,
  }));
}