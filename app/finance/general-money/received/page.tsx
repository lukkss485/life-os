"use client"

import React from "react"
import { creator } from "@/creator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const receivedMoney = [
  { origin: "Salário Empresa X", date: "05/03/2026", amount: "R$ 12.500,00" },
  { origin: "Consultoria Freelance", date: "20/02/2026", amount: "R$ 3.200,00" },
  { origin: "Reembolso Despesas", date: "10/02/2026", amount: "R$ 450,00" },
]

export default function GeneralMoneyReceivedPage() {
  return (
    <main className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto">
      <Card className="border-border shadow-xl bg-muted/20 backdrop-blur-md rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle>Entradas Recentes</CardTitle>
          <CardDescription>Relação de créditos em conta</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/60">
                <TableHead>Origem</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receivedMoney.map((item, idx) => (
                <TableRow key={idx} className="border-border/40">
                  <TableCell className="font-medium">{item.origin}</TableCell>
                  <TableCell className="text-muted-foreground">{item.date}</TableCell>
                  <TableCell className="text-right text-emerald-500 font-semibold">{item.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}