"use client"

import React from "react"
import { creator } from "@/creator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function GeneralMoneyOpportunitiesPage() {
  return (
    <main className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto">
      <Card className="border-border shadow-xl bg-muted/20 backdrop-blur-md rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle>Caixa Ocioso Otimizável</CardTitle>
          <CardDescription>Sugestões para rentabilizar saldo parado</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Você possui R$ 5.000 em conta corrente sem rendimento. Sugerimos aplicação em Renda Fixa com liquidez diária.</p>
        </CardContent>
      </Card>
    </main>
  )
}