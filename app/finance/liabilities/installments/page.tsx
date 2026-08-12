"use client"

import React from "react"
import { creator } from "@/creator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const installmentsList = [
  { store: "Magazine Luiza", item: "Smartphone", progress: "05/10", remaining: "R$ 2.500,00" },
  { store: "Mercado Livre", item: "Cadeira de Escritório", progress: "02/05", remaining: "R$ 600,00" },
]

export default function LiabilitiesInstallmentsPage() {
  return (
    <main className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto">
      <Card className="border-border shadow-xl bg-muted/20 backdrop-blur-md rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle>Compras Parceladas Ativas</CardTitle>
          <CardDescription>Parcelas restantes e evolução</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/60">
                <TableHead>Estabelecimento</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Parcela Atual</TableHead>
                <TableHead className="text-right">Saldo Devedor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {installmentsList.map((i, idx) => (
                <TableRow key={idx} className="border-border/40">
                  <TableCell className="font-medium">{i.store}</TableCell>
                  <TableCell className="text-muted-foreground">{i.item}</TableCell>
                  <TableCell>{i.progress}</TableCell>
                  <TableCell className="text-right font-semibold">{i.remaining}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}