"use client"

import React from "react"
import { creator } from "@/creator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function DividendsOthersPage() {
  return (
    <main className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto">
      <Card className="border-border shadow-xl bg-muted/20 backdrop-blur-md rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle>Rendimentos Extras</CardTitle>
          <CardDescription>Juros sobre Capital Próprio (JCP) e Bonificações em Ativos</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Nenhum provento extraordinário pendente de registro no momento.</p>
        </CardContent>
      </Card>
    </main>
  )
}