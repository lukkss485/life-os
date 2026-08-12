"use client"

import React from "react"
import { creator } from "@/creator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useDividends } from "@/hooks/use-dividends"
import { formatMoney } from "@/lib/money"

const receivedList = [
  { asset: "PETR4", date: "28/02/2026", type: "Dividendo", amount: "R$ 340,00" },
  { asset: "BBAS3", date: "15/02/2026", type: "JCP", amount: "R$ 180,50" },
  { asset: "TAEE11", date: "10/01/2026", type: "Dividendo", amount: "R$ 215,00" },
]

export default function DividendsReceivedPage() {
  const { dividends, loading } = useDividends();
  return (
    <main className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto">
      <Card className="border-border shadow-xl bg-muted/20 backdrop-blur-md rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle>Extrato de Proventos Recebidos</CardTitle>
          <CardDescription>Histórico recente de pagamentos</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/60">
                <TableHead>Ativo</TableHead>
                <TableHead>Data do Crédito</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dividends.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-semibold">{d.ticker}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(d.paidAt).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>{d.type}</TableCell>
                  <TableCell className="text-right font-medium text-emerald-500">
                    {formatMoney(d.money)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}