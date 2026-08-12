"use client"

import React, { useState } from "react"
import { creator } from "@/creator"
import { Lock, Crown, Sparkles, CheckCircle2 } from "lucide-react"

// Importações dos componentes do Shadcn
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function PremiumTab() {
  // Estado para simular se o usuário pagou ou não
  const [isUnlocked, setIsUnlocked] = useState(false)

  const handleSimulatePayment = () => {
    setIsUnlocked(true)
  }

  // Se o usuário pagou, exibe o conteúdo restrito
  if (isUnlocked) {
    return (
      <main className="flex-1 space-y-6 p-8 pt-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Área Exclusiva PRO</h2>
            <p className="text-sm text-muted-foreground">
              Conteúdo liberado com sucesso. Aproveite todos os recursos avançados.
            </p>
          </div>
          <Badge className="gap-1 bg-primary text-primary-foreground">
            <Crown size={14} /> Membro PRO Ativo
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Relatórios em Tempo Real</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Análises aprofundadas com sincronização instantânea via WebSockets.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Automação Avançada</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Crie fluxos de trabalho automáticos sem limite de execuções.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suporte Prioritário 24/7</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Fila de atendimento dedicada com tempo de resposta inferior a 15 minutos.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl">Painel de Controle Avançado</CardTitle>
            <CardDescription>Aqui estão suas ferramentas exclusivas de gerenciamento.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Acesso ilimitado a exportações em formato CSV e PDF.</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Painel de métricas customizáveis com drag-and-drop.</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => setIsUnlocked(false)}>
              Simular Bloqueio (Sair do PRO)
            </Button>
          </CardFooter>
        </Card>
      </main>
    )
  }

  // Tela de bloqueio solicitando o pagamento/assinatura
  return (
    <main className="flex-1 flex items-center justify-center p-8 pt-6 min-h-[80vh]">
      <Card className="max-w-md w-full text-center border-primary/20 shadow-lg">
        <CardHeader className="space-y-3">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Lock size={24} />
          </div>
          <CardTitle className="text-2xl font-bold">Conteúdo Restrito</CardTitle>
          <CardDescription>
            Esta aba é exclusiva para assinantes do plano PRO. Faça o upgrade para desbloquear todos os recursos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-4 text-left space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Sparkles size={16} className="text-primary" />
              <span>O que você vai desbloquear:</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1.5 pl-5 list-disc">
              <li>Relatórios e análises avançadas em tempo real</li>
              <li>Automações ilimitadas no sistema</li>
              <li>Suporte prioritário 24 horas por dia</li>
            </ul>
          </div>
          <div className="text-3xl font-extrabold tracking-tight">
            R$ 29,90 <span className="text-xs font-normal text-muted-foreground">/ mês</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button onClick={handleSimulatePayment} className="w-full gap-2">
            <Crown size={16} />
            Desbloquear Agora (Simular Pagamento)
          </Button>
          <p className="text-[10px] text-muted-foreground">
            Pagamento seguro via Stripe / Pix. Cancele quando quiser.
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}