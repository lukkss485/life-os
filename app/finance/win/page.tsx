"use client"

import { Trophy, Award, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { CelebrateButton } from "@/components/win/celebrate-button"
import { formatMoney } from "@/lib/money"
import { useWinMetrics } from "@/hooks/use-win-metrics"

const PIE_COLORS = ["#f59e0b", "#22c55e", "#a855f7", "#64748b"]

export default function WinPage() {
  const { data, loading } = useWinMetrics()

  if (loading || !data) {
    return <main className="flex-1 p-8 pt-6">Carregando...</main>
  }

  return (
    <main className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financies/Win</h1>
          <p className="text-sm text-muted-foreground">Conquistas financeiras, metas batidas e marcos alcançados.</p>
        </div>
        <CelebrateButton />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Metas Concluídas</CardTitle>
            <Trophy className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.goalsAchieved}</div>
            <p className="text-xs text-muted-foreground mt-1">Marcos registrados até agora</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Recorde de Poupança</CardTitle>
            <Award className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatMoney({ amount: data.savingsRecord * 100, currency: "BRL" })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Melhor saldo líquido mensal</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Independência Parcial</CardTitle>
            <Sparkles className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.independencePercent}%</div>
            <p className="text-xs text-muted-foreground mt-1">Despesas cobertas por dividendos</p>
          </CardContent>
        </Card>
      </div>

      {data.goalsByCategory.length > 0 && (
        <Card className="border-border shadow-xl bg-muted/20 backdrop-blur-md rounded-3xl overflow-hidden">
          <CardHeader>
            <CardTitle>Conquistas por Categoria</CardTitle>
            <CardDescription>Distribuição das metas batidas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-70 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.goalsByCategory}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                  >
                    {data.goalsByCategory.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", borderRadius: "12px" }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-border shadow-xl bg-muted/20 backdrop-blur-md rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle>Linha do Tempo de Conquistas</CardTitle>
          <CardDescription>Marcos importantes da sua jornada financeira</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.recentGoals.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              Nenhuma conquista registrada ainda.
            </p>
          ) : (
            data.recentGoals.map((goal) => (
              <div key={goal.id} className="flex items-start gap-4 p-4 rounded-2xl bg-card/40 border border-border/40">
                <Trophy className="h-6 w-6 text-amber-500 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-base">{goal.title}</h3>
                  {goal.description && (
                    <p className="text-sm text-muted-foreground">{goal.description}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(goal.achievedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
                  </p>
                </div>
                <CelebrateButton label="🎉" />
              </div>
            ))
          )}
        </CardContent>
      </Card>
          <Ps5AmbientSound />
    </main>
  )
}

import { useState, useRef } from 'react';

export function Ps5AmbientSound() {
  const [tocando, setTocando] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  const ligarSom = () => {
    // Inicializa o contexto de áudio
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    const gainNode = ctx.createGain();
    // Volume bem baixinho e agradável de fundo (0.04)
    gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
    gainNode.connect(ctx.destination);
    gainNodeRef.current = gainNode;

    // Acordes abertos e relaxantes em Hz (Tom etéreo / Ambient Pad)
    const frequencias = [100]; // A2, E3, A3, E4, A4

    const oscs = frequencias.map((freq) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine'; // Onda senoidal pura (som limpo e suave)
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Adiciona um LFO sutil para criar ondulação e movimento orgânico no som
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.15, ctx.currentTime);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(1.2, ctx.currentTime);
      
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      osc.connect(gainNode);
      osc.start();
      return osc;
    });

    oscillatorsRef.current = oscs;
    setTocando(true);
  };

  const desligarSom = () => {
    oscillatorsRef.current.forEach((osc) => osc.stop());
    oscillatorsRef.current = [];
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setTocando(false);
  };

  const alternarAudio = () => {
    if (tocando) {
      desligarSom();
    } else {
      ligarSom();
    }
  };

  return (
    <button
      onClick={alternarAudio}
      className="fixed bottom-4 right-4 z-50 px-3 py-2 text-xs bg-black/40 hover:bg-black/60 backdrop-blur border border-white/10 rounded-lg text-white/90 shadow-2xl flex items-center gap-2 transition-all cursor-pointer"
    >
      <span className={`w-2 h-2 rounded-full ${tocando ? 'bg-blue-400 animate-pulse' : 'bg-white/30'}`} />
      {tocando ? '🎧 PS5 Ambient: Ligado' : '🎵 PS5 Ambient: Desligado'}
    </button>
  );
}