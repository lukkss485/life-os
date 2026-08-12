"use client"

import { useFinanceStore } from "@/hooks/use-financeStore"
import { ArrowDownRight, ArrowUpRight, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { createMoney, CurrencyCode } from "@/lib/money"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Wallet, Landmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Transaction, TransactionType, TransactionStatus } from "@/types/finance"

// Ajuste aqui se o caminho real da página de suporte for diferente
const SUPPORT_URL = "/finance/suporte"

type FinanceActionsProps = {
  onCreate: (transaction: Omit<Transaction, "id" | "createdAt">) => Promise<void>
}

export function FinanceActions({ onCreate }: FinanceActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <RegisterBalanceDialog onCreate={onCreate} />
      <RegisterTransactionDialog onCreate={onCreate} />
      <ConnectBankButton />
    </div>
  )
}

// ─── Registrar Balanço ──────────────────────────────────────────────────────

function RegisterBalanceDialog({ onCreate }: FinanceActionsProps) {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState<CurrencyCode>("BRL")
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const value = parseFloat(amount.replace(",", "."))
    if (isNaN(value)) return

    setSubmitting(true)
    await onCreate({
      description: "Ajuste de Saldo",
      money: createMoney(Math.abs(value), currency),
      occurredAt: new Date().toISOString(),
      status: "Concluído",
      type: value >= 0 ? "income" : "expense",
    })
    setSubmitting(false)
    setAmount("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Wallet size={16} />
          Registrar Balanço
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Balanço</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <div className="space-y-2">
              <Label htmlFor="balance-amount">Valor do ajuste</Label>
              <Input
                id="balance-amount"
                type="text"
                inputMode="decimal"
                placeholder="Ex: 1500,00 ou -200,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Moeda</Label>
              <Select value={currency} onValueChange={(v) => setCurrency(v as CurrencyCode)}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BRL">BRL</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Use valor negativo pra reduzir o saldo, positivo pra aumentar.
          </p>
          <DialogFooter>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// ─── Registrar Transação ────────────────────────────────────────────────────

// RegisterTransactionDialog
function RegisterTransactionDialog({ onCreate }: FinanceActionsProps) {
  const [open, setOpen] = useState(false)
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState<CurrencyCode>("BRL")
  const [type, setType] = useState<TransactionType>("expense")
  const [status, setStatus] = useState<TransactionStatus>("Concluído")
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const value = parseFloat(amount.replace(",", "."))
    if (isNaN(value) || !description.trim()) return

    setSubmitting(true)
    await onCreate({
      description: description.trim(),
      money: createMoney(Math.abs(value), currency),
      occurredAt: new Date().toISOString(),
      status,
      type,
    })
    setSubmitting(false)
    setDescription("")
    setAmount("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus size={16} />
          Registrar Transação
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Transação</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tx-description">Descrição</Label>
            <Input
              id="tx-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Assinatura Spotify"
              required
            />
          </div>

          <div className="grid grid-cols-[1fr_auto] gap-2">
            <div className="space-y-2">
              <Label htmlFor="tx-amount">Valor</Label>
              <Input
                id="tx-amount"
                type="text"
                inputMode="decimal"
                placeholder="Ex: 55,90"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Moeda</Label>
              <Select value={currency} onValueChange={(v) => setCurrency(v as CurrencyCode)}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BRL">BRL</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select value={type} onValueChange={(v) => setType(v as TransactionType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Entrada</SelectItem>
                  <SelectItem value="expense">Saída</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as TransactionStatus)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Concluído">Concluído</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// ─── Conectar ao Banco (spoiler: ninguém vai clicar) ────────────────────────

function ConnectBankButton() {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      className="gap-2 text-muted-foreground"
      onClick={() => router.push(SUPPORT_URL)}
    >
      <Landmark size={16} />
      Conectar ao Banco
    </Button>
  )
}

// page
import { formatMoney } from "@/lib/money"

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export default function Financies() {
  const { transactions, currentSummary, chartData, loading, create } = useFinanceStore();

  if (loading) {
    return <main className="flex-1 p-8 pt-6">Carregando...</main>;
  }

  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Finanças</h2>
        <FinanceActions onCreate={create} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMoney(currentSummary.totalBalance)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entradas</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{formatMoney(currentSummary.income)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saídas</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{formatMoney(currentSummary.expenses)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Balanço</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width={1005} height={350}> {/* Garanta que width="100%" */}
              <BarChart data={chartData}>
                <XAxis
                  dataKey="name" // Certifique-se de que seus dados têm a propriedade "name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `R$${value}`}
                />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
                />
                <Bar
                  dataKey="total" // Certifique-se de que seus dados têm a propriedade "total"
                  radius={[4, 4, 0, 0]}
                  className="fill-primary"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transações Recentes</CardTitle>
            <CardDescription>Você tem {transactions.length} movimentações registradas.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>
                      <div className="font-medium">{tx.description}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(tx.occurredAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={tx.status === "Concluído" ? "default" : "secondary"}>{tx.status}</Badge>
                    </TableCell>
                    <TableCell className={`text-right font-medium ${tx.type === "expense" ? "text-destructive" : "text-primary"}`}>
                      {tx.type === "expense" ? "-" : "+"}{formatMoney(tx.money)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}