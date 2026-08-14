import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const notas = db
    .prepare("SELECT * FROM notas ORDER BY criado_em DESC")
    .all();

  return NextResponse.json(notas);
}

export async function POST(request: Request) {
  const { texto } = await request.json();

  if (!texto || typeof texto !== "string" || !texto.trim()) {
    return NextResponse.json(
      { error: "Texto da nota é obrigatório" },
      { status: 400 }
    );
  }

  const result = db
    .prepare("INSERT INTO notas (texto) VALUES (?)")
    .run(texto.trim());

  const novaNota = db
    .prepare("SELECT * FROM notas WHERE id = ?")
    .get(result.lastInsertRowid);

  return NextResponse.json(novaNota, { status: 201 });
}
