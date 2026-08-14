"use client";

import { CSSProperties, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
  getDisplacementFilter,
  DisplacementOptions,
} from "./getDisplacementFilter";
import { getDisplacementMap } from "./getDisplacementMap";
import styles from "./GlassElement.module.css";
import { cn } from "@/lib/utils";
import { useGlassConfig } from "@/contexts/glass-config-context";

export type SpecularHighlightOptions = {
  angle?: number;
  strength?: number;
  spread?: number;
  highlightOpacity?: number;
  rimOpacity?: number;
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

  const highlight = `inset ${x}px ${y}px 0px 0px hsla(0, 0%, 100%, ${clamp01(
    highlightOpacity * strength
  )})`;
  const rim = `inset ${-x * 0.6}px ${-y * 0.6}px 1px 0px hsla(0, 0%, 100%, ${clamp01(
    rimOpacity * strength
  )})`;
  const contact = `inset 0px -1px 1px 0px hsla(0, 0%, 0%, ${clamp01(
    contactShadowOpacity
  )})`;
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
    glassOpacity?: number;
    highlightStrength?: number;
    saturate?: number;
    autoSize?: boolean;
    minScale?: number;
  };

export const GlassElement = ({
  height = 100,
  width = 100,
  depth = 5,
  radius = 0,
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
  autoSize = false,
  minScale = 0.4,
  path,
  ...props
}: GlassElementProps & React.ComponentProps<"div">) => {
  const defaults = useGlassConfig();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState(width);

  useEffect(() => {
    if (!autoSize || !wrapperRef.current) return;

    const el = wrapperRef.current;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [autoSize]);

  const scale = autoSize
    ? Math.max(minScale, Math.min(1, containerWidth / width))
    : 1;

  const effectiveWidth = autoSize ? Math.min(width, containerWidth) : width;
  const effectiveHeight = height * scale;
  const effectiveRadius = radius * scale;
  const effectiveDepth = depth * scale;

  const _angle = angle ?? defaults.angle;
  const _highlightStrength = highlightStrength ?? defaults.highlightStrength;
  const _spread = spread ?? defaults.spread;
  const _highlightOpacity = highlightOpacity ?? defaults.highlightOpacity;
  const _rimOpacity = rimOpacity ?? defaults.rimOpacity;
  const _contactShadowOpacity = contactShadowOpacity ?? defaults.contactShadowOpacity;
  const _dropShadowOpacity = dropShadowOpacity ?? defaults.dropShadowOpacity;
  const _glassOpacity = glassOpacity ?? defaults.glassOpacity;
  const _blur = blur ?? defaults.blur;
  const _chromaticAberration = chromaticAberration ?? defaults.chromaticAberration;
  const _strength = strength ?? defaults.distortionStrength;

  // Memoiza a string SVG para evitar re-encodificação custosa a cada re-render do React
  const displacementFilterUrl = useMemo(() => {
    return getDisplacementFilter({
      height: effectiveHeight,
      width: effectiveWidth,
      radius: effectiveRadius,
      depth: effectiveDepth,
      strength: _strength,
      chromaticAberration: _chromaticAberration,
      path,
    });
  }, [effectiveHeight, effectiveWidth, effectiveRadius, effectiveDepth, _strength, _chromaticAberration, path]);

  const style: CSSProperties = {
    height: `${effectiveHeight}px`,
    width: `${effectiveWidth}px`,
    borderRadius: `${effectiveRadius}px`,
    backdropFilter: `blur(${_blur / 2}px) saturate(${saturate / 2}) url('${displacementFilterUrl}') blur(${_blur}px) saturate(${saturate})`,
    backgroundColor: `hsl(var(--card) / ${_glassOpacity / 100})`,
  };

  if (debug === true) {
    style.background = `url("${getDisplacementMap({
      height: effectiveHeight,
      width: effectiveWidth,
      radius: effectiveRadius,
      depth: effectiveDepth,
      path,
    })}")`;
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

  const glassDiv = (
    <div
      {...props}
      className={cn(shaders ? styles.box : styles.boxShaderStateOn, "transition-none!", className)}
      style={{ ...style, ...userStyle, ...boxstyle }}
    />
  );

  if (!autoSize) return glassDiv;

  return (
    <div ref={wrapperRef} style={{ width: "100%", maxWidth: width }}>
      {glassDiv}
    </div>
  );
};