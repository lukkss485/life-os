"use client"

import React from "react"
import { creator } from "@/creator"
import { DollarSign, ArrowUpRight, Award, Briefcase } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DividendsMainPage() {
  return (
    <main className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto">

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm flex flex-col justify-between">
          <CardHeader>
            <DollarSign className="h-8 w-8 text-emerald-500 mb-2" />
            <CardTitle>Visão Geral (All)</CardTitle>
            <CardDescription>Consolidado completo de proventos e rendimentos.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full rounded-xl">
              <Link href="/dividends/all">Acessar Geral</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm flex flex-col justify-between">
          <CardHeader>
            <Briefcase className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Empresas para Comprar</CardTitle>
            <CardDescription>Listagem de ativos focados em dividend yield elevado.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full rounded-xl">
              <Link href="/dividends/companiestobuy">Acessar Empresas</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm flex flex-col justify-between">
          <CardHeader>
            <Award className="h-8 w-8 text-amber-500 mb-2" />
            <CardTitle>Oportunidades</CardTitle>
            <CardDescription>Ativos descontados pagadores de dividendos.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full rounded-xl">
              <Link href="/dividends/oportunites">Acessar Oportunidades</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm flex flex-col justify-between">
          <CardHeader>
            <ArrowUpRight className="h-8 w-8 text-purple-500 mb-2" />
            <CardTitle>Recebidos</CardTitle>
            <CardDescription>Histórico de proventos já creditados na conta.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full rounded-xl">
              <Link href="/dividends/received">Acessar Recebidos</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm flex flex-col justify-between">
          <CardHeader>
            <DollarSign className="h-8 w-8 text-muted-foreground mb-2" />
            <CardTitle>Outros Proventos</CardTitle>
            <CardDescription>Juros sobre capital próprio e bonificações.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full rounded-xl">
              <Link href="/dividends/others">Acessar Outros</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}