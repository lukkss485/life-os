"use client"

import React from "react"
import { creator } from "@/creator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const payablesList = [
  { bill: "Conta de Energia (Copel)", dueDate: "10/04/2026", amount: "R$ 220,00" },
  { bill: "Internet Fibra", dueDate: "12/04/2026", amount: "R$ 119,90" },
  { bill: "Fatura Cartão de Crédito", dueDate: "15/04/2026", amount: "R$ 3.450,00" },
]

export default function LiabilitiesPayablesPage() {
  return (
    <main className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto">
      <Card className="border-border shadow-xl bg-muted/20 backdrop-blur-md rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle>Contas a Vencer</CardTitle>
          <CardDescription>Próximos compromissos financeiros</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/60">
                <TableHead>Conta / Despesa</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payablesList.map((p, idx) => (
                <TableRow key={idx} className="border-border/40">
                  <TableCell className="font-medium">{p.bill}</TableCell>
                  <TableCell className="text-muted-foreground">{p.dueDate}</TableCell>
                  <TableCell className="text-right font-semibold text-destructive">{p.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}