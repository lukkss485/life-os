// lib/useAnimals.ts

"use client";

import { useEffect, useState } from "react";
import { useStorage } from "@/lib";

export type PesoEntry = {
  data: string;
  peso: number;
};

export type Refeicao = {
  hora: string;
  label: string;
};

export type AnimalData = {
  peso: PesoEntry[];
  refeicoes: Refeicao[];
};

export function useAnimals() {
  const { valor, carregar, addData } = useStorage(
    "relationship",
    "animals"
  );

  const [animals, setAnimals] = useState<
    Record<string, AnimalData>
  >({});

  useEffect(() => {
    carregar();
  }, []);

  useEffect(() => {
    if (!valor) return;

    try {
      setAnimals(JSON.parse(valor));
    } catch {}
  }, [valor]);

  async function saveAnimal(
    id: string,
    data: AnimalData
  ) {
    const novo = {
      ...animals,
      [id]: data,
    };

    await addData({
      animals: JSON.stringify(novo),
    });

    setAnimals(novo);
  }

  return {
    animals,
    saveAnimal,
  };
}
