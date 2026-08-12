"use client"

import React from "react"
import { creator } from "@/creator"
import { CreditCard, ArrowDownRight, FileText, Users, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LiabilitiesMainPage() {
  return (
    <main className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto">

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm flex flex-col justify-between">
          <CardHeader>
            <CreditCard className="h-8 w-8 text-destructive mb-2" />
            <CardTitle>Visão Geral (All)</CardTitle>
            <CardDescription>Consolidado total de dívidas e obrigações.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full rounded-xl">
              <Link href="/liabilities/all">Acessar Geral</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm flex flex-col justify-between">
          <CardHeader>
            <ArrowDownRight className="h-8 w-8 text-amber-500 mb-2" />
            <CardTitle>Contas a Pagar</CardTitle>
            <CardDescription>Vencimentos próximos e faturas em aberto.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full rounded-xl">
              <Link href="/liabilities/payables">Acessar Pagáveis</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm flex flex-col justify-between">
          <CardHeader>
            <FileText className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Parcelamentos</CardTitle>
            <CardDescription>Acompanhamento de compras parceladas.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full rounded-xl">
              <Link href="/liabilities/installments">Acessar Parcelas</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm flex flex-col justify-between">
          <CardHeader>
            <Users className="h-8 w-8 text-purple-500 mb-2" />
            <CardTitle>Devedores / A Receber</CardTitle>
            <CardDescription>Valores devidos por terceiros a você.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full rounded-xl">
              <Link href="/liabilities/debtors">Acessar Devedores</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm flex flex-col justify-between">
          <CardHeader>
            <DollarSign className="h-8 w-8 text-muted-foreground mb-2" />
            <CardTitle>Outros Passivos</CardTitle>
            <CardDescription>Obrigações financeiras secundárias.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full rounded-xl">
              <Link href="/liabilities/others">Acessar Outros</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}