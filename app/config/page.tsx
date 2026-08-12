"use client";
import { useFps } from "@/hooks/use-fps"

import { LiquidGlassSlider } from "@/components/liquid-glass-slider";
import { SlideToUnlock } from "@/components/slide-to-unlock";
import { useMemo, useState, type CSSProperties } from "react";
import { GlassElement } from "@/components/GlassElement/GlassElement";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { X } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Slider com rótulo + valor, embrulhando o Slider do shadcn (Radix). */
/* ------------------------------------------------------------------ */
type SlidersecondProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
};

function Slidersecond({ label, value, min, max, step = 1, unit = "", onChange }: SlidersecondProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{label}</span>
        <span className="tabular-nums">
          {value}
          {unit}
        </span>
      </div>
      <LiquidGlassSlider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        width={360}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Estado completo do efeito — usado pra presets, reset e export.      */
/* ------------------------------------------------------------------ */
type EstadoEfeito = {
  angle: number;
  highlightStrength: number;
  spread: number;
  highlightOpacity: number;
  rimOpacity: number;
  contactShadowOpacity: number;
  dropShadowOpacity: number;
  glassOpacity: number;
  blur: number;
  depth: number;
  chromaticAberration: number;
  distortionStrength: number;
};

const PADRAO: EstadoEfeito = {
  angle: 45,
  highlightStrength: 1,
  spread: 2,
  highlightOpacity: 0.5,
  rimOpacity: 0.15,
  contactShadowOpacity: 0.12,
  dropShadowOpacity: 0.4,
  glassOpacity: 10,
  blur: 0,
  depth: 10,
  chromaticAberration: 0,
  distortionStrength: 300,
};

const PRESETS: Record<string, EstadoEfeito> = {
  Padrão: PADRAO,
  "Vidro fosco": {
    ...PADRAO,
    angle: 60,
    highlightStrength: 0.6,
    highlightOpacity: 0.3,
    rimOpacity: 0.08,
    glassOpacity: 22,
    blur: 6,
  },
  "Brilho intenso": {
    ...PADRAO,
    angle: 30,
    highlightStrength: 1.8,
    spread: 4,
    highlightOpacity: 0.85,
    rimOpacity: 0.3,
    dropShadowOpacity: 0.55,
  },
  Sutil: {
    ...PADRAO,
    highlightStrength: 0.35,
    highlightOpacity: 0.25,
    rimOpacity: 0.05,
    contactShadowOpacity: 0.06,
    dropShadowOpacity: 0.2,
  },
};

/* ------------------------------------------------------------------ */

export default function configLiquidGlassEspecularHighlight() {
  const fps = useFps()
  const [estado, setEstado] = useState<EstadoEfeito>(PADRAO);
  const [mostrarDebug, setMostrarDebug] = useState(true);
  const [fundo, setFundo] = useState(0);

  function set<K extends keyof EstadoEfeito>(chave: K) {
    return (v: number) => setEstado((s) => ({ ...s, [chave]: v }));
  }

  const specularProps = {
    angle: estado.angle,
    highlightStrength: estado.highlightStrength,
    spread: estado.spread,
    highlightOpacity: estado.highlightOpacity,
    rimOpacity: estado.rimOpacity,
    contactShadowOpacity: estado.contactShadowOpacity,
    dropShadowOpacity: estado.dropShadowOpacity,
    glassOpacity: estado.glassOpacity,
  };

  const codigo = useMemo(() => {
    const linhas = Object.entries(estado).map(([k, v]) => `  ${k}={${v}}`);
    return `<GlassElement\n  width={200}\n  height={100}\n  radius={200}\n${linhas.join("\n")}\n/>`;
  }, [estado]);

  async function copiarCodigo() {
    try {
      await navigator.clipboard.writeText(codigo);
      toast.success("Código copiado para a área de transferência");
    } catch {
      toast("Não foi possível copiar automaticamente — selecione o bloco manualmente.");
    }
  }

  function aplicarPreset(nome: string) {
    setEstado(PRESETS[nome]);
    toast(`Preset "${nome}" aplicado`);
  }

  const CHECKER_CLARO = "#e8e8e8";
  const CHECKER_ESCURO = "#ffffff";
  const CHECKER_TAM = 20;

  type Fundo = {
  nome: string;
  swatch: CSSProperties;
} & (
  | { tipo: "style"; style: CSSProperties }
  | { tipo: "video"; youtubeId: string }
);

const fundos: Fundo[] = [
  {
  nome: "Vídeo (YouTube)",
  tipo: "video",
  youtubeId: "6FsYk9GIv2Y",
  swatch: { backgroundColor: "#000", backgroundImage: "linear-gradient(135deg,#333,#000)" },
},
  {
    nome: "Quadriculado",
    tipo: "style",
    style: {
      backgroundColor: CHECKER_ESCURO,
      backgroundImage: `linear-gradient(45deg, ${CHECKER_CLARO} 25%, transparent 25%),
        linear-gradient(-45deg, ${CHECKER_CLARO} 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, ${CHECKER_CLARO} 75%),
        linear-gradient(-45deg, transparent 75%, ${CHECKER_CLARO} 75%)`,
      backgroundSize: `${CHECKER_TAM}px ${CHECKER_TAM}px`,
      backgroundPosition: `0 0, 0 ${CHECKER_TAM / 2}px, ${CHECKER_TAM / 2}px -${CHECKER_TAM / 2}px, -${CHECKER_TAM / 2}px 0px`,
    },
    swatch: {
      backgroundColor: CHECKER_ESCURO,
      backgroundImage: `linear-gradient(45deg, ${CHECKER_CLARO} 25%, transparent 25%),
        linear-gradient(-45deg, ${CHECKER_CLARO} 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, ${CHECKER_CLARO} 75%),
        linear-gradient(-45deg, transparent 75%, ${CHECKER_CLARO} 75%)`,
      backgroundSize: "8px 8px",
      backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
    },
  },
  {
    nome: "Aurora",
    tipo: "style",
    style: { background: "linear-gradient(135deg,#ff5f6d,#7b2ff7 45%,#00c6ff)" },
    swatch: { background: "linear-gradient(135deg,#ff5f6d,#7b2ff7 45%,#00c6ff)" },
  },
  {
    nome: "Pôr do sol",
    tipo: "style",
    style: { background: "linear-gradient(135deg,#f9d423,#ff4e50 50%,#43e97b)" },
    swatch: { background: "linear-gradient(135deg,#f9d423,#ff4e50 50%,#43e97b)" },
  },
  {
    nome: "Foto",
    tipo: "style",
    style: {
      background: "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=60) center/cover",
    },
    swatch: {
      background: "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=80&q=60) center/cover",
    },
  },
  {
    nome: "Vídeo",
    tipo: "video",
    youtubeId: "QgiCfGpkiTQ",
    swatch: { backgroundColor: "#000", backgroundImage: "linear-gradient(135deg,#333,#000)" },
  },
  
];

  return (
    <div className="max-w-5xl mx-auto px-6 pb-20">
      <div className="text-center mb-8 mt-6">
        <h1 className="text-3xl font-bold mb-2">
          Configuração do Liquid Glass com Especular Highlight
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Ajuste o efeito ao vivo, compare com o mapa de deslocamento e copie o
          código pronto para usar em qualquer <code>{"<GlassElement />"}</code>.
        </p>
        <div className="fixed top-4 right-4 z-50 rounded-lg bg-black/80 text-white text-xs font-mono px-3 py-1.5">
  {fps} FPS
</div>
      </div>

      {/* -------- presets -------- */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {Object.keys(PRESETS).map((nome) => (
          <Button
            key={nome}
            variant="outline"
            size="sm"
            onClick={() => aplicarPreset(nome)}
          >
            {nome}
          </Button>
        ))}
      </div>

      {/* -------- preview -------- */}
      <Card className="mb-8 overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <CardTitle>Pré-visualização</CardTitle>
              <CardDescription>
                Passe o mouse sobre o vidro pra ver a transparência de hover.
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                {fundos.map((f, i) => (
                  <button
                    key={f.nome}
                    onClick={() => setFundo(i)}
                    aria-label={f.nome}
                    title={f.nome}
                    className="w-6 h-6 rounded-full border overflow-hidden"
                    style={{ ...f.swatch, outline: fundo === i ? "2px solid currentColor" : "none" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
  <div
    className="relative flex items-center justify-center gap-10 flex-wrap rounded-lg py-16 overflow-hidden"
    style={fundos[fundo].tipo === "style" ? fundos[fundo].style : undefined}
  >
    {fundos[fundo].tipo === "video" && (
      <iframe
        key={fundos[fundo].youtubeId}
        className="absolute inset-0 w-full h-full pointer-events-none"
        src={`https://www.youtube.com/embed/${fundos[fundo].youtubeId}?autoplay=1&mute=1&loop=1&playlist=${fundos[fundo].youtubeId}&controls=0&modestbranding=1`}
        allow="autoplay; encrypted-media"
        title="Vídeo de fundo"
      />
    )}

    <div className="relative z-10 flex gap-10 flex-wrap">
      <GlassElement
        width={200}
        height={100}
        radius={50}
        depth={estado.depth}
        blur={estado.blur}
        strength={estado.distortionStrength}
        chromaticAberration={estado.chromaticAberration}
        className="index-20 flex items-center justify-center"
        
        {...specularProps}
        children={<><X absoluteStrokeWidth size={40} /></>}
      />
    </div>
  </div>
</CardContent>
      </Card>

      {/* -------- controles -------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Especular highlight</CardTitle>
            <CardDescription>Direção e intensidade do brilho na borda.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <Slidersecond label="Ângulo da luz" value={estado.angle} min={0} max={359} unit="°" onChange={set("angle")} />
            <Slidersecond label="Força do brilho" value={estado.highlightStrength} min={0} max={2} step={0.05} onChange={set("highlightStrength")} />
            <Slidersecond label="Spread (px)" value={estado.spread} min={0} max={12} step={0.5} onChange={set("spread")} />
            <Slidersecond label="Opacidade do highlight" value={estado.highlightOpacity} min={0} max={1} step={0.05} onChange={set("highlightOpacity")} />
            <Slidersecond label="Opacidade do rim (lado oposto)" value={estado.rimOpacity} min={0} max={1} step={0.05} onChange={set("rimOpacity")} />
            <Slidersecond label="Sombra de contato" value={estado.contactShadowOpacity} min={0} max={1} step={0.05} onChange={set("contactShadowOpacity")} />
            <Slidersecond label="Drop shadow" value={estado.dropShadowOpacity} min={0} max={1} step={0.05} onChange={set("dropShadowOpacity")} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vidro e distorção</CardTitle>
            <CardDescription>Como o conteúdo por trás é refratado.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <Slidersecond label="Opacidade do vidro" value={estado.glassOpacity} min={0} max={50} unit="%" onChange={set("glassOpacity")} />
            <Slidersecond label="Blur" value={estado.blur} min={0.5} max={20} step={0.1} onChange={set("blur")} />
            <Slidersecond label="Depth (distorção)" value={estado.depth} min={0} max={40} onChange={set("depth")} />
            <Slidersecond label="Aberração cromática" value={estado.chromaticAberration} min={0} max={20} onChange={set("chromaticAberration")} />
            <Slidersecond label="Força da distorção" value={estado.distortionStrength} min={0} max={600} step={10} onChange={set("distortionStrength")} />
          </CardContent>
        </Card>
      </div>

      {/* -------- ações + código -------- */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <CardTitle>Código</CardTitle>
              <CardDescription>Cole isso direto onde for usar o vidro.</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setEstado(PADRAO)}>
                Restaurar padrão
              </Button>
              <Button size="sm" onClick={copiarCodigo}>
                Copiar código
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <pre className="text-xs bg-muted rounded-md p-4 overflow-x-auto">
            <code>{codigo}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}