"use client"

import React from "react"
import { creator } from "@/creator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const companies = [
  { ticker: "PETR4", sector: "Petróleo e Gás", dy: "11.2%", recommendation: "Forte Compra" },
  { ticker: "BBAS3", sector: "Financeiro", dy: "9.5%", recommendation: "Compra" },
  { ticker: "VALE3", sector: "Mineração", dy: "8.1%", recommendation: "Compra" },
  { ticker: "TAEE11", sector: "Energia Elétrica", dy: "8.8%", recommendation: "Manter/Compra" },
]

export default function CompaniesToBuyPage() {
  return (
    <main className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto">
      <Card className="border-border shadow-xl bg-muted/20 backdrop-blur-md rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle>Top Pagadoras de Dividendos</CardTitle>
          <CardDescription>Seleção baseada em fundamentos e Dividend Yield histórico</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/60">
                <TableHead>Ativo</TableHead>
                <TableHead>Setor</TableHead>
                <TableHead>Dividend Yield (DY)</TableHead>
                <TableHead className="text-right">Recomendação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((c) => (
                <TableRow key={c.ticker} className="border-border/40">
                  <TableCell className="font-semibold">{c.ticker}</TableCell>
                  <TableCell className="text-muted-foreground">{c.sector}</TableCell>
                  <TableCell className="text-emerald-500 font-medium">{c.dy}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="default">{c.recommendation}</Badge>
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