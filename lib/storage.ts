// storage.ts
import Database from "better-sqlite3";
import path from "path";

export type PkgValue = string | number | boolean | null | PkgObject | PkgValue[];
export interface PkgObject {
  [key: string]: PkgValue;
}

const DB_PATH = path.join(process.cwd(), "data", "storage.db");

const globalForDb = globalThis as unknown as { _storageDb?: Database.Database };

const db = globalForDb._storageDb ?? new Database(DB_PATH);

if (process.env.NODE_ENV !== "production") {
  globalForDb._storageDb = db;
}

db.exec(`
  CREATE TABLE IF NOT EXISTS pkgs (
    name TEXT PRIMARY KEY,
    data TEXT NOT NULL
  )
`);

function sanitizePkgName(name: string): string {
  const base = name.replace(/\.json$/, "");
  if (!/^[a-zA-Z0-9_-]+$/.test(base)) {
    throw new Error(`[storage] nome de pacote inválido: "${name}"`);
  }
  return base;
}

export function readRaw(pkgName: string): PkgObject {
  const safe = sanitizePkgName(pkgName);
  const row = db.prepare("SELECT data FROM pkgs WHERE name = ?").get(safe) as
    | { data: string }
    | undefined;

  if (!row) throw new Error(`[storage] pacote não encontrado: "${pkgName}"`);
  return JSON.parse(row.data) as PkgObject;
}

export function writeRaw(pkgName: string, data: PkgObject) {
  const safe = sanitizePkgName(pkgName);
  db.prepare(
    `INSERT INTO pkgs (name, data) VALUES (?, ?)
     ON CONFLICT(name) DO UPDATE SET data = excluded.data`
  ).run(safe, JSON.stringify(data));
}

export function createPkg(pkgName: string, initialData: PkgObject = {}): void {
  const safe = sanitizePkgName(pkgName);
  const existe = db.prepare("SELECT 1 FROM pkgs WHERE name = ?").get(safe);
  if (existe) throw new Error(`[storage] pacote já existe: "${pkgName}"`);
  writeRaw(pkgName, initialData);
}

export function deletePkg(pkgName: string): void {
  const safe = sanitizePkgName(pkgName);
  const result = db.prepare("DELETE FROM pkgs WHERE name = ?").run(safe);
  if (result.changes === 0) throw new Error(`[storage] pacote não encontrado: "${pkgName}"`);
}

export function listPkgs(): string[] {
  const rows = db.prepare("SELECT name FROM pkgs").all() as { name: string }[];
  return rows.map((r) => r.name);
}