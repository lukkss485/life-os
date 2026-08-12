"use client"

import React from "react"
import { creator } from "@/creator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"

const monthlyData = [
  { name: "Semana 1", valor: 3100 },
  { name: "Semana 2", valor: 4500 },
  { name: "Semana 3", valor: 3800 },
  { name: "Semana 4", valor: 5200 },
]

export default function AnalyticsMonthlyPage() {
  return (
    <main className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto">
      <Card className="border-border shadow-xl bg-muted/20 backdrop-blur-md rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle>Fluxo Mensal Detalhado</CardTitle>
          <CardDescription>Evolução ao longo das semanas do mês atual</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="valor" stroke="#22c55e" strokeWidth={3} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}