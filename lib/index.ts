"use client";

export { add, rem } from "@/lib/tokens";
export { edit, resStr } from "@/lib/actions";

// lib/useStorage.ts

import { useState, useEffect } from "react";
import { resStr, edit } from "@/lib/actions";
import { add, rem } from "@/lib/tokens";

export function useStorage(pkgName: string, key: string) {
  const [valor, setValor] = useState<string | null>(null);

  async function carregar() {
    const v = await resStr(pkgName, key);
    setValor(v);
  }

  useEffect(() => {
    carregar();
  }, [pkgName, key]);

  async function addData(data: Record<string, any>) {
    await edit(pkgName, add, data);
    await carregar();
  }

  async function removeData(data: Record<string, any>) {
    await edit(pkgName, rem, data);
    setValor(null);
  }

  return { valor, carregar, addData, removeData };
}
