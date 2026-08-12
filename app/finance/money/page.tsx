"use client"

import React from "react"
import { creator } from "@/creator"
import { Wallet, TrendingUp, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts"

const moneyData = [
  { month: "Jan", balance: 30000 },
  { month: "Fev", balance: 34000 },
  { month: "Mar", balance: 38500 },
  { month: "Abr", balance: 42850 },
]

export default function MoneyPage() {
  return (
    <main className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Financies/Money</h1>
        <p className="text-sm text-muted-foreground">Visão dedicada ao dinheiro líquido e saldos disponíveis.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Saldo Líquido em Contas</CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">R$ 42.850,00</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 text-emerald-500">
              <ArrowUpRight size={14} /> +11.1% em relação ao último mês
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rendimento de Caixa</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">R$ 380,40</div>
            <p className="text-xs text-muted-foreground mt-1">Rendimento CDI acumulado no mês</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border shadow-xl bg-muted/20 backdrop-blur-md rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle>Evolução do Saldo Líquido</CardTitle>
          <CardDescription>Crescimento do capital disponível</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[320px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={moneyData}>
                <defs>
                  <linearGradient id="colorMoney" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="balance" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorMoney)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}