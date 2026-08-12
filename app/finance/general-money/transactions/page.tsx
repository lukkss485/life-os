"use client"

import { useFinanceStore } from "@/hooks/use-financeStore"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatMoney } from "@/lib/money"

export default function GeneralMoneyTransactionsPage() {
  const { transactions, loading } = useFinanceStore()

  if (loading) {
    return <main className="flex-1 p-8 pt-6">Carregando...</main>
  }

  return (
    <main className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transação</h1>
        <p className="text-sm text-muted-foreground">
          Extrato completo e detalhado das suas movimentações financeiras.
        </p>
      </div>
      <Card className="border-border shadow-xl bg-muted/20 backdrop-blur-md rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle>Histórico de Transações</CardTitle>
          <CardDescription>Todas as movimentações recentes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/60">
                <TableHead>Descrição</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id} className="border-border/40">
                  <TableCell className="font-medium">{tx.description}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(tx.occurredAt).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    <Badge variant={tx.type === "income" ? "default" : "secondary"}>
                      {tx.type === "income" ? "Entrada" : "Saída"}
                    </Badge>
                  </TableCell>
                  <TableCell className={`text-right font-semibold ${tx.type === "income" ? "text-emerald-500" : "text-destructive"}`}>
                    {tx.type === "income" ? "+" : "-"}{formatMoney(tx.money)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}