"use client";

import { useState } from "react";
import { GlassElement } from "@/components/GlassElement/GlassElement";
import {Slider} from "@/components/ui/slider";

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
      <Slider
  min={min}
  max={max}
  step={step}
  value={[value]}                              // sempre array
  onValueChange={(vals) => onChange(vals[0])}   // não onChange
  className="w-full"
/>
    </div>
  );
}

export default function configLiquidGlassEspecularHighlight() {
  // ---- controles do specular highlight ----
  const [angle, setAngle] = useState(45);
  const [highlightStrength, setHighlightStrength] = useState(1);
  const [spread, setSpread] = useState(2);
  const [highlightOpacity, setHighlightOpacity] = useState(0.5);
  const [rimOpacity, setRimOpacity] = useState(0.15);
  const [contactShadowOpacity, setContactShadowOpacity] = useState(0.12);
  const [dropShadowOpacity, setDropShadowOpacity] = useState(0.4);

  // ---- controles gerais do vidro (não é o specular, mas ajuda a ver o efeito) ----
  const [glassOpacity, setGlassOpacity] = useState(10);
  const [blur, setBlur] = useState(0);
  const [depth, setDepth] = useState(10);
  const [chromaticAberration, setChromaticAberration] = useState(0);
  const [distortionStrength, setDistortionStrength] = useState(300);

  const specularProps = {
    angle,
    highlightStrength,
    spread,
    highlightOpacity,
    rimOpacity,
    contactShadowOpacity,
    dropShadowOpacity,
    glassOpacity,
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-4">
        Configuração do Liquid Glass com Especular Highlight
      </h1>
      <p className="text-center mb-4">
        Esta página demonstra a configuração do Liquid Glass com o efeito de Especular Highlight.
      </p>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 max-w-2xl w-full px-6 mb-10">
          <Slidersecond label="Ângulo da luz" value={angle} min={0} max={359} unit="°" onChange={setAngle} />
          <Slidersecond
            label="Força do brilho"
            value={highlightStrength}
            min={0}
            max={2}
            step={0.05}
            onChange={setHighlightStrength}
          />
          <Slidersecond label="Spread (px)" value={spread} min={0} max={12} step={0.5} onChange={setSpread} />
          <Slidersecond
            label="Opacidade do highlight"
            value={highlightOpacity}
            min={0}
            max={1}
            step={0.05}
            onChange={setHighlightOpacity}
          />
          <Slidersecond
            label="Opacidade do rim (lado oposto)"
            value={rimOpacity}
            min={0}
            max={1}
            step={0.05}
            onChange={setRimOpacity}
          />
          <Slidersecond
            label="Sombra de contato"
            value={contactShadowOpacity}
            min={0}
            max={1}
            step={0.05}
            onChange={setContactShadowOpacity}
          />
          <Slidersecond
            label="Drop shadow"
            value={dropShadowOpacity}
            min={0}
            max={1}
            step={0.05}
            onChange={setDropShadowOpacity}
          />
          <Slidersecond
            label="Opacidade do vidro"
            value={glassOpacity}
            min={0}
            max={50}
            unit="%"
            onChange={setGlassOpacity}
          />
          <Slidersecond label="Blur" value={blur} min={0} max={20} onChange={setBlur} />
          <Slidersecond label="Depth (distorção)" value={depth} min={0} max={40} onChange={setDepth} />
          <Slidersecond
            label="Aberração cromática"
            value={chromaticAberration}
            min={0}
            max={20}
            onChange={setChromaticAberration}
          />
          <Slidersecond
            label="Força da distorção"
            value={distortionStrength}
            min={0}
            max={600}
            step={10}
            onChange={setDistortionStrength}
          />
        </div>
      </div>

      <div className="flex justify-center gap-8 flex-wrap">
        {/* mapa de deslocamento (debug) — mostra o que alimenta o backdrop-filter */}
        <GlassElement
          width={200}
          height={200}
          radius={200}
          depth={depth}
          blur={blur}
          strength={distortionStrength}
          chromaticAberration={chromaticAberration}
          debug
          className="index-20"
        />
        {/* efeito real, com o specular highlight ligado aos controles acima */}
        <GlassElement
          width={200}
          height={200}
          radius={200}
          depth={depth}
          blur={blur}
          strength={distortionStrength}
          chromaticAberration={chromaticAberration}
          className="index-20"
          {...specularProps}
        />
      </div>
    </>
  );
}
