import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  db.prepare("DELETE FROM notas WHERE id = ?").run(params.id);
  return NextResponse.json({ ok: true });
}
