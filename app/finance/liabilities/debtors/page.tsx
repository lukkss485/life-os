"use client"

import React from "react"
import { creator } from "@/creator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const debtorsList = [
  { name: "João Silva", reason: "Empréstimo pessoal", dueDate: "10/04/2026", amount: "R$ 1.500,00" },
  { name: "Carlos Souza", reason: "Divisão de despesa viagem", dueDate: "15/03/2026", amount: "R$ 320,00" },
]

export default function LiabilitiesDebtorsPage() {
  return (
    <main className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto">
      <Card className="border-border shadow-xl bg-muted/20 backdrop-blur-md rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle>Valores a Receber de Terceiros</CardTitle>
          <CardDescription>Devedores cadastrados</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/60">
                <TableHead>Nome</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {debtorsList.map((d, idx) => (
                <TableRow key={idx} className="border-border/40">
                  <TableCell className="font-medium">{d.name}</TableCell>
                  <TableCell className="text-muted-foreground">{d.reason}</TableCell>
                  <TableCell>{d.dueDate}</TableCell>
                  <TableCell className="text-right font-semibold text-emerald-500">{d.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}