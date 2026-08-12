"use client"

import React from "react"
import { creator } from "@/creator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Sparkles, ArrowUpRight } from "lucide-react"

export default function DividendOpportunitiesPage() {
  return (
    <main className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Janela de Desconto - Setor Elétrico</CardTitle>
            <Sparkles className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Empresas do setor elétrico negociando abaixo do valor patrimonial médio com DY projetado superior a 9% para os próximos 12 meses.</p>
            <div className="flex items-center gap-1 text-xs text-emerald-500 font-medium pt-2">
              <ArrowUpRight size={14} /> Alta oportunidade de alocação
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Fundos Imobiliários (FIIs) de Papel</CardTitle>
            <Sparkles className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">FIIs com IPCA+ atrelados oferecendo taxas reais atraentes para construção de renda passiva mensal isenta.</p>
            <div className="flex items-center gap-1 text-xs text-emerald-500 font-medium pt-2">
              <ArrowUpRight size={14} /> Renda mensal garantida
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}