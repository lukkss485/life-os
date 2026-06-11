"use server";

import { EditOp } from "@/lib/tokens";
import { readRaw, writeRaw, PkgObject, PkgValue } from "@/lib/storage";

export async function edit(pkgName: string, op: EditOp, fields: PkgObject) {
  const current = readRaw(pkgName);
  if (op === "add") { writeRaw(pkgName, { ...current, ...fields }); return; }
  if (op === "rem") {
    const next = { ...current };
    for (const key of Object.keys(fields)) delete next[key];
    writeRaw(pkgName, next);
  }
}

export async function resStr(pkgName: string, key: string): Promise<string> {
  const pkg = readRaw(pkgName);
  const v = pkg[key] as PkgValue;
  if (v === null) return "null";
  if (typeof v === "object") return JSON.stringify(v, null, 2);
  return String(v);
}