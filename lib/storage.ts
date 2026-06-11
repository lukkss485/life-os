import fs from "fs";
import path from "path";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type PkgValue = string | number | boolean | null | PkgObject | PkgValue[];
export interface PkgObject {
  [key: string]: PkgValue;
}

// ─── Caminho ──────────────────────────────────────────────────────────────────

const STORAGE_DIR = path.join(process.cwd(), "public", "static", "storage");

function pkgPath(name: string) {
  return path.join(STORAGE_DIR, name.endsWith(".json") ? name : `${name}.json`);
}

// ─── I/O base ─────────────────────────────────────────────────────────────────

export function readRaw(pkgName: string): PkgObject {
  const p = pkgPath(pkgName);
  if (!fs.existsSync(p)) throw new Error(`[storage] pacote não encontrado: "${pkgName}"`);
  return JSON.parse(fs.readFileSync(p, "utf-8")) as PkgObject;
}

export function writeRaw(pkgName: string, data: PkgObject) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
  fs.writeFileSync(pkgPath(pkgName), JSON.stringify(data, null, 2), "utf-8");
}

// ─── Utilitários de pacote ────────────────────────────────────────────────────

export function createPkg(pkgName: string, initialData: PkgObject = {}): void {
  if (fs.existsSync(pkgPath(pkgName)))
    throw new Error(`[storage] pacote já existe: "${pkgName}"`);
  writeRaw(pkgName, initialData);
}

export function deletePkg(pkgName: string): void {
  const p = pkgPath(pkgName);
  if (!fs.existsSync(p)) throw new Error(`[storage] pacote não encontrado: "${pkgName}"`);
  fs.unlinkSync(p);
}

export function listPkgs(): string[] {
  if (!fs.existsSync(STORAGE_DIR)) return [];
  return fs.readdirSync(STORAGE_DIR)
    .filter(f => f.endsWith(".json"))
    .map(f => f.replace(".json", ""));
}