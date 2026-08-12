"use client"

import { creator } from "@/creator"
import { BarChart3, PieChart, TrendingUp, Sparkles, Activity, Receipt } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const sections = [
  {
    href: "/finance/analytics/all",
    icon: BarChart3,
    iconColor: "text-primary",
    title: "Analytics Geral (All)",
    description: "Visão amalgamada de todas as métricas analíticas.",
    cta: "Acessar Geral",
  },
  {
    href: "/finance/analytics/monthly",
    icon: TrendingUp,
    iconColor: "text-emerald-500",
    title: "Métricas Mensais",
    description: "Acompanhe o desempenho mês a mês detalhadamente.",
    cta: "Acessar Mensal",
  },
  {
    href: "/finance/analytics/yearly",
    icon: PieChart,
    iconColor: "text-amber-500",
    title: "Análise Anual",
    description: "Perspectiva de longo prazo e fechamentos anuais.",
    cta: "Acessar Anual",
  },
  {
    href: "/finance/analytics/performance",
    icon: Activity,
    iconColor: "text-blue-500",
    title: "Performance",
    description: "Índice de saúde financeira e evolução de ganhos e perdas.",
    cta: "Acessar Performance",
  },
  {
    href: "/finance/analytics/tax",
    icon: Receipt,
    iconColor: "text-rose-500",
    title: "Impostos",
    description: "Estimativas e histórico de tributos sobre rendimentos.",
    cta: "Acessar Impostos",
  },
  {
    href: "/finance/analytics/others",
    icon: Sparkles,
    iconColor: "text-purple-500",
    title: "Outros Indicadores",
    description: "Métricas secundárias, KPIs e índices avançados.",
    cta: "Acessar Outros",
  },
]

export default function AnalyticsPage() {
  return (
    <main className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Análises</h1>
        <p className="text-sm text-muted-foreground">
          Central de relatórios analíticos e inteligência financeira.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map(({ href, icon: Icon, iconColor, title, description, cta }) => (
          <Card key={href} className="border-border/50 bg-card/50 backdrop-blur-sm flex flex-col justify-between">
            <CardHeader>
              <Icon className={`h-8 w-8 mb-2 ${iconColor}`} />
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full rounded-xl">
                <Link href={href}>{cta}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}