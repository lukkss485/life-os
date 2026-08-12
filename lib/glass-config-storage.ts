"use server";

import { readRaw, writeRaw, createPkg, PkgObject } from "@/lib/storage";
import { DEFAULT_GLASS_CONFIG, type GlassConfig } from "@/types/glass-config";

const PKG = "glass-config";

function ensurePkg(): PkgObject {
  try {
    return readRaw(PKG);
  } catch {
    const initial = DEFAULT_GLASS_CONFIG as unknown as PkgObject;
    createPkg(PKG, initial);
    return initial;
  }
}

export async function getGlassConfig(): Promise<GlassConfig> {
  const pkg = ensurePkg();
  // Mescla com o default: se algum campo novo for adicionado no futuro
  // e o arquivo salvo em disco ainda não tiver ele, cai no valor padrão.
  return { ...DEFAULT_GLASS_CONFIG, ...(pkg as unknown as Partial<GlassConfig>) };
}

export async function saveGlassConfig(config: GlassConfig): Promise<void> {
  writeRaw(PKG, config as unknown as PkgObject);
}