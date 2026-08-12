"use client"

import React from "react"
import { creator } from "@/creator"
import { DollarSign, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GeneralMoneyMainPage() {
  return (
    <main className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto">

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm flex flex-col justify-between">
          <CardHeader>
            <DollarSign className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Visão Geral (All)</CardTitle>
            <CardDescription>Resumo consolidado do dinheiro disponível.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full rounded-xl">
              <Link href="/general-money/all">Acessar Geral</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm flex flex-col justify-between">
          <CardHeader>
            <DollarSign className="h-8 w-8 text-emerald-500 mb-2" />
            <CardTitle>Transações</CardTitle>
            <CardDescription>Extrato detalhado de entradas e saídas.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full rounded-xl">
              <Link href="/general-money/transactions">Acessar Transações</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm flex flex-col justify-between">
          <CardHeader>
            <DollarSign className="h-8 w-8 text-amber-500 mb-2" />
            <CardTitle>Recebidos</CardTitle>
            <CardDescription>Valores recebidos recentemente.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full rounded-xl">
              <Link href="/general-money/received">Acessar Recebidos</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm flex flex-col justify-between">
          <CardHeader>
            <DollarSign className="h-8 w-8 text-purple-500 mb-2" />
            <CardTitle>Oportunidades</CardTitle>
            <CardDescription>Oportunidades de alocação de caixa.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full rounded-xl">
              <Link href="/general-money/oportunites">Acessar Oportunidades</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm flex flex-col justify-between">
          <CardHeader>
            <DollarSign className="h-8 w-8 text-muted-foreground mb-2" />
            <CardTitle>Outros</CardTitle>
            <CardDescription>Outros registros monetários diversos.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full rounded-xl">
              <Link href="/general-money/others">Acessar Outros</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}