"use client"

import { useState } from "react"
import { Smile, Meh, Frown, ShieldCheck, Activity, ChevronDown, Zap, ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts"
import { useFinanceAnalytics } from "@/hooks/use-finance-analytics"
import { FinanceMode } from "@/lib/finance-analytics"

type DisplayMode = "Gráfico normal" | "Cartões com detalhes" | "Ao clicar ter detalhes"

const MODE_STYLE: Record<FinanceMode, {
  icon: typeof Smile
  color: string
  title: string
  subtitle: string
}> = {
  1: { icon: Smile, color: "emerald", title: "Ótimo", subtitle: "Tudo está em ordem" },
  2: { icon: Meh, color: "amber", title: "Bom", subtitle: "Nem tudo está em ordem" },
  3: { icon: Frown, color: "red", title: "Ruim", subtitle: "Está tudo ruim" },
}

export default function FinanciesAnalyticsPerformance() {
  const [displayMode, setDisplayMode] = useState<DisplayMode>("Gráfico normal")
  const { data, loading } = useFinanceAnalytics("BRL")

  if (loading || !data) {
    return <main className="flex-1 p-8 pt-6">Carregando...</main>
  }

  const mode = MODE_STYLE[data.mode]
  const ModeIcon = mode.icon

  return (
    <main className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto">

      {/* Seção de Status Principal */}
      <div className="flex flex-col items-center justify-center text-center space-y-3 py-6">
        <div className="relative flex items-center justify-center">
          <svg className="absolute h-28 w-28 -rotate-90 animate-spin-slow" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="42" fill="transparent" stroke="currentColor" strokeWidth="6"
              className={`text-${mode.color}-500/20`}
            />
            <circle
              cx="50" cy="50" r="42" fill="transparent" stroke="currentColor" strokeWidth="6"
              strokeDasharray="264"
              strokeDashoffset={264 - (264 * data.healthIndex) / 100}
              strokeLinecap="round"
              className={`text-${mode.color}-500`}
            />
          </svg>

          <div className={`h-15 w-15 rounded-full bg-${mode.color}-500/10 flex items-center justify-center text-${mode.color}-500 shadow-lg border border-${mode.color}-500/20`}>
            <ModeIcon size={42} strokeWidth={2} />
          </div>
        </div>

        <div className="space-y-1 mt-[9px]">
          <h1 className={`text-4xl font-extrabold tracking-tight text-${mode.color}-500`}>{mode.title}</h1>
          <p className="text-sm font-medium text-muted-foreground">{mode.subtitle}</p>
        </div>
      </div>

      {/* Cards de Métricas Complementares */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Índice de Saúde</CardTitle>
            <Activity className={`h-4 w-4 text-${mode.color}-500`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.healthIndex}%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowUpRight size={14} className={`text-${mode.color}-500`} />
              Baseado em entradas vs. saídas
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estabilidade</CardTitle>
            <ShieldCheck className={`h-4 w-4 text-${mode.color}-500`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mode.title}</div>
            <p className="text-xs text-muted-foreground mt-1">{mode.subtitle}</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Potencial de Economia</CardTitle>
            <Zap className={`h-4 w-4 text-${mode.color}-500`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.healthIndex}/100</div>
            <p className="text-xs text-muted-foreground mt-1">Pontuação atual</p>
          </CardContent>
        </Card>
      </div>

      {/* Bloco Principal de Performance */}
      <Card className="border-border shadow-xl bg-muted/20 backdrop-blur-md rounded-3xl overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-6 px-6 pt-6">
          <div>
            <CardTitle className="text-xl font-bold tracking-tight">Performance</CardTitle>
            <CardDescription>Análise detalhada de rendimento por período</CardDescription>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 rounded-full shadow-sm bg-card hover:bg-card/80">
                <span>{displayMode}</span>
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 rounded-xl p-1">
              {(["Cartões com detalhes", "Gráfico normal"] as DisplayMode[]).map((mode) => (
                <DropdownMenuItem
                  key={mode}
                  onClick={() => setDisplayMode(mode)}
                  className="rounded-lg cursor-pointer text-xs font-medium py-2"
                >
                  {mode}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <CardContent className="px-6 pb-6">
          {data.performance.length === 0 ? (
            <p className="text-sm text-muted-foreground py-12 text-center">
              Sem transações registradas ainda.
            </p>
          ) : displayMode === "Cartões com detalhes" ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {data.performance.map((p, i) => {
                const isPositive = p.type === "positive"
                const TrendIcon = isPositive ? TrendingUp : TrendingDown
                return (
                  <Card
                    key={i}
                    className={`border ${isPositive ? "border-emerald-500/30 bg-emerald-500/5" : "border-red-500/30 bg-red-500/5"}`}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-muted-foreground">{p.date}</div>
                        <div className={`text-lg font-bold ${isPositive ? "text-emerald-500" : "text-red-500"}`}>
                          {isPositive ? "+" : "-"}R${p.value.toFixed(2)}
                        </div>
                      </div>
                      <TrendIcon className={`h-5 w-5 ${isPositive ? "text-emerald-500" : "text-red-500"}`} />
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="h-[380px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.performance} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                  <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `R$${v}`} />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{ borderRadius: "12px", backgroundColor: "var(--card)", borderColor: "var(--border)", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                    formatter={(value: any) => [`R$${value}`, "Total"]}
                  />
                  <Bar dataKey="value" radius={[100, 100, 0, 0]}>
                    {data.performance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.type === "positive" ? "#22c55e" : "#ef4444"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground px-2 border-t border-border/40 pt-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              <span>Ganho</span>
              <span className="h-2.5 w-2.5 rounded-full bg-red-500 ml-3" />
              <span>Perda</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}