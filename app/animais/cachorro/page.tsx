// components/dashboard/relationship-preview.sjs

"use client";

import { useState, useEffect, useRef } from "react";
import { Line, LineChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { useStorage } from "@/lib";
import { Table, TableBody, TableRow, TableCell, TableHead, TableHeader, TableFooter } from "@/components/ui/table";


const MAX_REFEICOES = 3;

// ── imagens ────────────────────────────────────────────────────
const CAT_IMG = "é muito peso :P";
const DOG_IMG = "é muito peso :P";

type Refeicao = { hora: string; label: string };
type PesoEntry = { data: string; peso: number };
type ProblemaEntry = { data: string; descricao: string; custo: number };

type AnimalStorageData = {
  refeicoes: Refeicao[];
  historicoPeso: PesoEntry[];
  historicoProblemas: ProblemaEntry[];
};

type GlobalStorage = Record<string, AnimalStorageData>;

type Animal = {
  id: string;
  nome: string;
  tipo: string;
  img: string;
  cor: string;
  accent: string;
  corBg: string;
  pesoAtual: number;
  pesoMeta: number;
  historicoPeso: PesoEntry[];
};

const ANIMAIS_INIT: Animal[] = [
  {
    id: "gotinho",
    nome: "Gotinho",
    tipo: "Gato · em dieta 🥗",
    img: CAT_IMG,
    cor: "#1a8ccd",
    accent: "#1a8ccd",
    corBg: "#e8f4fd",
    pesoAtual: 5.2,
    pesoMeta: 4.0,
    historicoPeso: [
      { data: "20/05", peso: 10 },
      { data: "27/05", peso: 5.8 },
      { data: "03/06", peso: 5.2 },
    ],
  },
  {
    id: "jhow",
    nome: "Jhow",
    tipo: "Cachorro",
    img: DOG_IMG,
    cor: "#2e9e4f",
    accent: "#2e9e4f",
    corBg: "#edf7ee",
    pesoAtual: 8.5,
    pesoMeta: 8.5,
    historicoPeso: [
    ],
  },
  {
    id: "baba",
    nome: "Baba",
    tipo: "papagaio",
    img: CAT_IMG,
    cor: "#ffff00",
    accent: "#ffff79",
    corBg: "#fffffd",
    pesoAtual: 8.5,
    pesoMeta: 8.5,
    historicoPeso: [
    ],
  },
];

const chartConfig = {
  peso: { label: "Peso", color: "var(--color-accent)" },
} satisfies ChartConfig;

// ─────────────────────────────────────────────────────────────────
// Hook compartilhado: lê/grava o pacote inteiro como um único objeto
// ─────────────────────────────────────────────────────────────────
function useGlobalAnimais() {
  const { valor, carregar, addData } = useStorage("package1", "animais");

  const [global, setGlobal] = useState<GlobalStorage>({});
  const globalRef = useRef<GlobalStorage>({});

  useEffect(() => {
    carregar();
  }, []);

  useEffect(() => {
    if (!valor) return;
    try {
      const parsed: GlobalStorage = JSON.parse(valor);
      setGlobal(parsed);
      globalRef.current = parsed;
    } catch { }
  }, [valor]);

  async function salvarAnimal(id: string, data: Partial<AnimalStorageData>) {
    const atual = globalRef.current[id] ?? {};
    const merged: GlobalStorage = {
      ...globalRef.current,
      [id]: { ...atual, ...data },
    };
    globalRef.current = merged;
    setGlobal(merged);
    await addData({ animais: merged });
    await carregar();
  }

  return { global, salvarAnimal };
}

// ─────────────────────────────────────────────────────────────────
// Card de animal
// ─────────────────────────────────────────────────────────────────
export function AnimalCard({
  animal,
  Scale,
  globalData,
  salvarAnimal,
}: {
  animal: Animal;
  Scale: boolean;
  globalData: GlobalStorage;
  salvarAnimal: (id: string, data: Partial<AnimalStorageData>) => Promise<void>;
}) {
  if (!animal) return <div>Carregando...</div>;

  const saved = globalData[animal.id];
  const refeicoes = saved?.refeicoes ?? [];
  const historico = saved?.historicoPeso ?? animal.historicoPeso;

  const [novoPeso, setNovoPeso] = useState("");
  const [mostrarPeso, setMostrarPeso] = useState(false);

  async function registrarRefeicao() {
    if (refeicoes.length >= MAX_REFEICOES) return;
    const hora = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    const labels = ["1ª refeição", "2ª refeição", "3ª refeição"];
    const novas = [...refeicoes, { hora, label: labels[refeicoes.length] }];
    await salvarAnimal(animal.id, { refeicoes: novas, historicoPeso: historico });
  }

  async function removerUltima() {
    if (refeicoes.length === 0) return;
    await salvarAnimal(animal.id, { refeicoes: refeicoes.slice(0, -1), historicoPeso: historico });
  }

  async function adicionarPeso() {
    const p = parseFloat(novoPeso.replace(",", "."));
    if (isNaN(p)) return;
    const hoje = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
    const novo = [...historico, { data: hoje, peso: p }].slice(-8);
    await salvarAnimal(animal.id, { refeicoes, historicoPeso: novo });
    setNovoPeso("");
    setMostrarPeso(false);
  }

  const cheio = refeicoes.length >= MAX_REFEICOES;
  const ultimaPeso = historico[historico.length - 1]?.peso ?? animal.pesoAtual;
  const diff = (ultimaPeso - animal.pesoMeta).toFixed(1);
  const emDieta = animal.pesoMeta < ultimaPeso;

  const [novaDesc, setNovaDesc] = useState("");
  const [novoCusto, setNovoCusto] = useState("");
  const [mostrarProblema, setMostrarProblema] = useState(false);

  const historicoProblemas = saved?.historicoProblemas ?? [];

  async function adicionarProblema() {
    const custo = parseFloat(novoCusto);
    if (!novaDesc || isNaN(custo)) return;

    const hoje = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
    const novo = [...historicoProblemas, { data: hoje, descricao: novaDesc, custo }];

    await salvarAnimal(animal.id, {
      refeicoes,
      historicoPeso: historico,
      historicoProblemas: novo
    });

    setNovaDesc("");
    setNovoCusto("");
    setMostrarProblema(false);
  }
  const totalCustos = historicoProblemas.reduce((acc, p) => acc + (p.custo || 0), 0);

  if (!Scale) {
    return (
      <div className="px-5 py-3 min-w-screen min-h-screen relative">
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img src={animal.img} alt={animal.nome}
            style={{
              width: 64, height: 64, borderRadius: "50%", objectFit: "cover",
              objectPosition: "center top", flexShrink: 0, border: `2px solid ${animal.cor}33`
            }} />
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 500, fontSize: 18, color: "var(--color-text-primary)" }}>{animal.nome}</p>
            <p style={{ margin: "2px 0 0", fontSize: 13, color: "var(--color-text-secondary)" }}>{animal.tipo}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, fontSize: 22, fontWeight: 500, color: animal.cor }}>{ultimaPeso}kg</p>
            {emDieta && <p style={{ margin: "2px 0 0", fontSize: 11, color: "#c4621a" }}>+{diff}kg da meta</p>}
          </div>
        </div>

        <div className="min-w-full px-5 top-[72.5%] left-0 absolute">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 500, color: "var(--color-text-secondary)", letterSpacing: "0.07em" }}>Refeições hoje</p>
            <p style={{ margin: 0, fontSize: 15, color: "var(--color-text-secondary)" }}>{refeicoes.length}/{MAX_REFEICOES}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen"
      style={{
        background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)",
        padding: "1.25rem", display: "flex", flexDirection: "column", gap: 16
      }}>
      <div className="w-full"
        style={{
          background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)",
          borderRadius: 16, padding: "1.25rem", display: "flex", flexDirection: "column", gap: 16
        }}>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img src={animal.img} alt={animal.nome}
            style={{
              width: 64, height: 64, borderRadius: "50%", objectFit: "cover",
              objectPosition: "center top", flexShrink: 0, border: `2px solid ${animal.cor}33`
            }} />
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 500, fontSize: 18, color: "var(--color-text-primary)" }}>{animal.nome}</p>
            <p style={{ margin: "2px 0 0", fontSize: 13, color: "var(--color-text-secondary)" }}>{animal.tipo}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, fontSize: 22, fontWeight: 500, color: animal.cor }}>{ultimaPeso}kg</p>
            {emDieta && <p style={{ margin: "2px 0 0", fontSize: 11, color: "#c4621a" }}>+{diff}kg da meta</p>}
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 450, color: "var(--color-text-secondary)", letterSpacing: "0.07em" }}>
              Refeições hoje
            </p>
            <p style={{ margin: 0, fontSize: 15, color: "var(--color-text-secondary)" }}>
              {refeicoes.length}/{MAX_REFEICOES}
            </p>
          </div>

          <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                flex: 1, height: 6, borderRadius: 4,
                background: i < refeicoes.length ? animal.cor : "var(--color-background-secondary)"
              }} />
            ))}
          </div>

          {refeicoes.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 10 }}>
              {refeicoes.map((r, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", fontSize: 13,
                  padding: "4px 0", borderBottom: "0.5px solid var(--color-border-tertiary)"
                }}>
                  <span style={{ color: "var(--color-text-secondary)" }}>{r.label}</span>
                  <span style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>{r.hora}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 8 }}>
            <Button onClick={registrarRefeicao} disabled={cheio}
              style={{
                borderColor: cheio ? "var(--color-border-tertiary)" : animal.cor,
                background: cheio ? "var(--color-background-secondary)" : animal.corBg,
                color: cheio ? "var(--color-text-secondary)" : animal.cor
              }}>
              {cheio ? "Limite atingido" : "Registrar refeição"}
            </Button>
            {refeicoes.length > 0 && (
              <Button variant="ghost" size="sm" onClick={removerUltima} className="h-9">
                Desfazer
              </Button>
            )}
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 450, color: "var(--color-text-secondary)", letterSpacing: "0.07em" }}>
              Histórico de peso
            </p>
            <Button onClick={() => setMostrarPeso(!mostrarPeso)} variant="link"
              style={{ fontSize: 12, color: animal.cor, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              {mostrarPeso ? "Cancelar" : "+ Registrar"}
            </Button>
          </div>

          {mostrarPeso && (
            <div style={{ display: 'flex', gap: 50, marginBottom: 8, minWidth: "100%" }}>
              <input type="number" placeholder="Ex: 5" value={novoPeso}
                onChange={e => setNovoPeso(e.target.value)} className="w-full" />
              <Button onClick={adicionarPeso} variant="outline" className="right-0">
                Salvar
              </Button>
            </div>
          )}

          <ChartContainer config={chartConfig} className="h-[150px] w-full mt-8">
            <LineChart data={historico}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="data" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line dataKey="peso" type="monotone" stroke={animal.cor} strokeWidth={2} dot={{ fill: animal.cor }} />
            </LineChart>
          </ChartContainer>
        </div>

        <div className="mt-8 pt-6 border-t">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p style={{ fontSize: 15, fontWeight: 450, color: "var(--color-text-secondary)" }}>
              Problemas e Custos
            </p>
            <Button onClick={() => setMostrarProblema(!mostrarProblema)} variant="link" className="p-0 text-xs" style={{ color: animal.cor }}>
              {mostrarProblema ? "Cancelar" : "+ Registrar"}
            </Button>
          </div>

          {mostrarProblema && (
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <input type="text" placeholder="O que aconteceu?" value={novaDesc} onChange={e => setNovaDesc(e.target.value)} className="w-full p-2 border rounded" />
              <input type="number" placeholder="R$" value={novoCusto} onChange={e => setNovoCusto(e.target.value)} className="w-20 p-2 border rounded" />
              <Button onClick={adicionarProblema}>Salvar</Button>
            </div>
          )}

          <Table className="min-w-full">
            <TableHeader className="min-w-full">
              <TableRow className="min-w-full">
                <TableHead>Descricao</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Custo</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {historicoProblemas.map((p, i) => (
                <TableRow key={i}>
                  <TableCell><span>{p.descricao}</span></TableCell>
                  <TableCell><span>{p.data}</span></TableCell>
                  <TableCell><span style={{ fontWeight: 600, color: "#d32f2f" }}>R$ {p.custo.toFixed(2)}</span></TableCell>
                </TableRow>
              ))}
            </TableBody>

            {historicoProblemas.length > 0 && (
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}>Total Acumulado</TableCell>
                  <TableCell className="font-bold text-red-600">
                    R$ {totalCustos.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Componente público
// ─────────────────────────────────────────────────────────────────
export default function RelationshipPage() {
  const { global, salvarAnimal } = useGlobalAnimais();
  const scale = true;
  return (
    <section className="max-w-full flex-col" style={{ display: "flex", justifyContent: "center", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 25 }}>
        <AnimalCard
          animal={ANIMAIS_INIT.find(a => a.id === "jhow")}
          Scale={scale}
          globalData={global}
          salvarAnimal={salvarAnimal}
        />
      </div>
    </section>
  );
}