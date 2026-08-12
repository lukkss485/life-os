"use client"

import React from "react"
import { creator } from "@/creator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function LiabilitiesAllPage() {
  return (
    <main className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto">
      <Card className="border-border shadow-xl bg-muted/20 backdrop-blur-md rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle>Total de Dívidas e Passivos</CardTitle>
          <CardDescription>Soma de financiamentos, parcelas e contas a vencer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-extrabold text-destructive">R$ 12.400,00</div>
        </CardContent>
      </Card>
    </main>
  )
}