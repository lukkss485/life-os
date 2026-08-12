"use client"

import React from "react"
import { creator } from "@/creator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function GeneralMoneyAllPage() {
  return (
    <main className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto">
      <Card className="border-border shadow-xl bg-muted/20 backdrop-blur-md rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle>Saldo Total Disponível</CardTitle>
          <CardDescription>Contas correntes, investimentos de liquidez diária e caixa</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-extrabold text-primary">R$ 42.850,00</div>
        </CardContent>
      </Card>
    </main>
  )
}