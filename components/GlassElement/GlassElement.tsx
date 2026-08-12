"use client";
 
import { CSSProperties, ReactNode, useState } from "react";
import {
  getDisplacementFilter,
  DisplacementOptions,
} from "./getDisplacementFilter";
import { getDisplacementMap } from "./getDisplacementMap";
import styles from "./GlassElement.module.css";
import { cn } from "@/lib/utils";
import { useGlassConfig } from "@/contexts/glass-config-context";
 
export type SpecularHighlightOptions = {
  /** Ângulo de onde a luz vem, em graus (0 = direita, 90 = baixo, 270 = cima) */
  angle?: number;
  /** Força geral do efeito (0 a ~2). Escala o brilho e a sombra de contato juntos */
  strength?: number;
  /** Distância em px do highlight principal em relação à borda */
  spread?: number;
  /** Intensidade do highlight primário (0 a 1) */
  highlightOpacity?: number;
  /** Intensidade do highlight secundário, do lado oposto (0 a 1) */
  rimOpacity?: number;
  /** Sombra de contato na base + drop shadow externa */
  contactShadowOpacity?: number;
  dropShadowOpacity?: number;
};
 
export const getSpecularHighlight = ({
  angle = 45,
  strength = 1,
  spread = 2,
  highlightOpacity = 0.5,
  rimOpacity = 0.15,
  contactShadowOpacity = 0.12,
  dropShadowOpacity = 0.4,
}: SpecularHighlightOptions = {}): string => {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * spread * strength;
  const y = Math.sin(rad) * spread * strength;
 
  // highlight principal: aparece na borda voltada para a luz
  const highlight = `inset ${x}px ${y}px 0px 0px hsla(0, 0%, 100%, ${clamp01(
    highlightOpacity * strength
  )})`;
 
  // rim: brilho fraco do lado OPOSTO à luz (luz "vazando" pela borda de trás)
  const rim = `inset ${-x * 0.6}px ${-y * 0.6}px 1px 0px hsla(0, 0%, 100%, ${clamp01(
    rimOpacity * strength
  )})`;
 
  // sombra de contato: linha escura fixa na base, como se o vidro "pousasse" numa superfície
  const contact = `inset 0px -1px 1px 0px hsla(0, 0%, 0%, ${clamp01(
    contactShadowOpacity
  )})`;
 
  // drop shadow externa, dá elevação ao elemento
  const drop = `0px 4px 7.5px 0px hsla(0, 0%, 0%, ${clamp01(dropShadowOpacity)})`;
 
  return [highlight, rim, contact, drop].join(",\n    ");
};
 
function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n));
}
 
export type GlassElementProps = DisplacementOptions &
  Omit<SpecularHighlightOptions, "strength"> & {
    children?: ReactNode | undefined;
    blur?: number;
    debug?: boolean;
    className?: string;
    shaders?: boolean;
    /** Opacidade do preenchimento de vidro (0 a 100). No hover, o vidro fica ainda mais transparente. */
    glassOpacity?: number;
    /** Força do highlight especular (0 a ~2) — separado do "strength" da distorção acima */
    highlightStrength?: number;
    /** Fator de saturação (1 = normal, 0 = cinza, >1 = mais saturado) */
    saturate?: number;
  };
 
export const GlassElement = ({
  height,
  width,
  depth,
  radius,
  strength,
  chromaticAberration,
  blur,
  debug = false,
  shaders = false,
  className,
  glassOpacity,
  angle,
  highlightStrength,
  spread,
  highlightOpacity,
  rimOpacity,
  contactShadowOpacity,
  dropShadowOpacity,
  style: userStyle,
  saturate = 1.5,
  ...props
}: GlassElementProps & React.ComponentProps<"div">) => {
  const defaults = useGlassConfig();

  // Cada prop: se veio explícita, usa ela; senão, cai na config salva
  const _angle = angle ?? defaults.angle;
  const _highlightStrength = highlightStrength ?? defaults.highlightStrength;
  const _spread = spread ?? defaults.spread;
  const _highlightOpacity = highlightOpacity ?? defaults.highlightOpacity;
  const _rimOpacity = rimOpacity ?? defaults.rimOpacity;
  const _contactShadowOpacity = contactShadowOpacity ?? defaults.contactShadowOpacity;
  const _dropShadowOpacity = dropShadowOpacity ?? defaults.dropShadowOpacity;
  const _glassOpacity = glassOpacity ?? defaults.glassOpacity;
  const _blur = blur ?? defaults.blur;
  const _depth = depth ?? defaults.depth;
  const _chromaticAberration = chromaticAberration ?? defaults.chromaticAberration;
  const _strength = strength ?? defaults.distortionStrength;

  const style: CSSProperties = {
    height: `${height}px`,
    width: `${width}px`,
    borderRadius: `${radius}px`,
    backdropFilter: `blur(${_blur / 2}px) saturate(${saturate / 2}) url('${getDisplacementFilter({
      height,
      width,
      radius,
      depth: _depth,
      strength: _strength,
      chromaticAberration: _chromaticAberration,
    })}') blur(${_blur}px) saturate(${saturate})`,
    backgroundColor: `hsl(var(--card) / ${(_glassOpacity) / 100})`,
  };

  if (debug === true) {
    style.background = `url("${getDisplacementMap({ height, width, radius, depth: _depth })}")`;
    style.boxShadow = "none";
  } 

  const boxstyle: CSSProperties = debug
    ? {}
    : {
        boxShadow: getSpecularHighlight({
          angle: _angle,
          strength: _highlightStrength,
          spread: _spread,
          highlightOpacity: _highlightOpacity,
          rimOpacity: _rimOpacity,
          contactShadowOpacity: _contactShadowOpacity,
          dropShadowOpacity: _dropShadowOpacity,
        }),
      };

  return (
    <div
      {...props}
      className={cn(shaders ? styles.box : styles.boxShaderStateOn, "transition-none!", className)}
      style={{ ...style, ...userStyle, ...boxstyle }}
    />
  );
};