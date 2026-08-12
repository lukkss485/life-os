"use client"

import React from "react"
import { creator } from "@/creator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function LiabilitiesOthersPage() {
  return (
    <main className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto">
      <Card className="border-border shadow-xl bg-muted/20 backdrop-blur-md rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle>Passivos Diversos</CardTitle>
          <CardDescription>Obrigações secundárias</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Nenhum passivo adicional registrado.</p>
        </CardContent>
      </Card>
    </main>
  )
}