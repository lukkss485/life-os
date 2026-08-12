"use client"

import React, { useState } from "react"
import { creator } from "@/creator"
import { 
  HelpCircle, 
  MessageSquare, 
  FileText, 
  Mail, 
  Send,
  ChevronDown
} from "lucide-react"

// Importações dos componentes do Shadcn
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export default function Support() {
  const [ticketSent, setTicketSent] = useState(false)

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault()
    setTicketSent(true)
    setTimeout(() => setTicketSent(false), 4000)
  }

  return (
    <main className="flex-1 space-y-6 p-8 pt-6">
      
      {/* Cabeçalho da Página */}
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Central de Suporte</h2>
          <p className="text-sm text-muted-foreground">
            Encontre respostas rápidas ou entre em contato com nossa equipe.
          </p>
        </div>
        <Badge variant="outline" className="gap-1.5 py-1 px-3 text-xs font-medium">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          Suporte Online
        </Badge>
      </div>

      {/* Cards de Acesso Rápido */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">Base de Conhecimento</CardTitle>
            <FileText className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Artigos, tutoriais passo a passo e documentação técnica completa.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">Chat ao Vivo</CardTitle>
            <MessageSquare className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Converse em tempo real com um de nossos especialistas de plantão.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">E-mail Direto</CardTitle>
            <Mail className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Envie sua dúvida detalhada para suporte@seudominio.com.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Seção Principal: FAQ e Formulário de Ticket */}
      <div className="flex flex-col gap-6">
        
        {/* Perguntas Frequentes (FAQ) */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Perguntas Frequentes
            </CardTitle>
            <CardDescription>
              Respostas para as dúvidas mais comuns da plataforma.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Como alterar a senha da minha conta?</AccordionTrigger>
                <AccordionContent>
                  Vá até as configurações de perfil no menu lateral, selecione a aba de segurança e clique em "Alterar Senha". Siga as instruções enviadas para o seu e-mail cadastrado.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Como funcionam os relatórios financeiros?</AccordionTrigger>
                <AccordionContent>
                  Os relatórios são gerados automaticamente com base nas transações cadastradas. Você pode exportá-los em formato PDF ou planilha a qualquer momento clicando no botão de exportação.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Posso integrar com outras ferramentas?</AccordionTrigger>
                <AccordionContent>
                  Sim! Acesse a aba de plugins para conectar extensões de terceiros, ferramentas de automação e APIs externas de forma instantânea.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Quais são as formas de pagamento aceitas?</AccordionTrigger>
                <AccordionContent>
                  Aceitamos cartões de crédito das principais bandeiras, boleto bancário e PIX com compensação imediata para assinaturas e planos ativos.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Formulário para Abrir Ticket */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Abrir um Chamado</CardTitle>
            <CardDescription>
              Não encontrou o que procurava? Envie uma mensagem.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Assunto</label>
                <Input placeholder="Ex: Problema com o relatório" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Mensagem</label>
                <Textarea 
                  placeholder="Descreva detalhadamente o ocorrido..." 
                  className="min-h-[120px]" 
                  required 
                />
              </div>
              <Button type="submit" className="w-full gap-2">
                <Send size={16} />
                Enviar Chamado
              </Button>
              {ticketSent && (
                <p className="text-xs text-primary font-medium text-center animate-fade-in">
                  Chamado enviado com sucesso! Retornaremos em breve.
                </p>
              )}
            </form>
          </CardContent>
        </Card>

      </div>
    </main>
  )
}