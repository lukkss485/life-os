"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import React, { useCallback, useEffect, useId, useRef } from "react";

import { cn } from "@/lib/utils";

import { RefractionFilter } from "./refraction-filter";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface LiquidGlassSliderProps {
  // ─────────────────────────────────────────────────────────────────────────
  // Value Control
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Current value of the slider (controlled mode).
   * If provided, the slider becomes controlled.
   */
  value?: number;

  /**
   * Default value of the slider (uncontrolled mode).
   * @default 10
   */
  defaultValue?: number;

  /**
   * Minimum value of the slider.
   * @default 0
   */
  min?: number;

  /**
   * Maximum value of the slider.
   * @default 100
   */
  max?: number;

  /**
   * Step size for value changes.
   * @default 1
   */
  step?: number;

  /**
   * Callback triggered when the slider value changes.
   */
  onChange?: (value: number) => void;

  /**
   * Callback triggered when dragging starts.
   */
  onDragStart?: () => void;

  /**
   * Callback triggered when dragging ends.
   */
  onDragEnd?: () => void;

  // ─────────────────────────────────────────────────────────────────────────
  // Appearance
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Additional CSS classes.
   */
  className?: string;

  /**
   * Width of the slider track in pixels.
   * @default 330
   */
  width?: number;

  /**
   * Color of the track fill (progress portion).
   * @default "#0377F7"
   */
  fillColor?: string;

  /**
   * Color of the track background.
   * @default "#89898F66"
   */
  trackColor?: string;

  /**
   * Color of the thumb when not pressed.
   * @default "rgba(255, 255, 255, 1)"
   */
  thumbColor?: string;

  /**
   * Whether the slider is disabled.
   * @default false
   */
  disabled?: boolean;

  // ─────────────────────────────────────────────────────────────────────────
  // Optical Parameters (Advanced)
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Blur level for the glass refraction effect.
   * @default 0
   */
  blur?: number;

  /**
   * Opacity of the specular highlight.
   * @default 0.4
   */
  specularOpacity?: number;

  /**
   * Saturation multiplier for the specular highlight.
   * @default 7
   */
  specularSaturation?: number;

  /**
   * Base refraction level (controls magnification intensity).
   * @default 1
   */
  refractionLevel?: number;
  id?: string;

  /** Nome do campo, usado se o slider fizer parte de um <form>. */
  name?: string;

  /** Rótulo acessível quando não há <label> visível associado. */
  "aria-label"?: string;

  /** id de um elemento que rotula este slider (alternativa ao aria-label). */
  "aria-labelledby"?: string;

  /** id de um elemento com descrição adicional (ex: texto de ajuda). */
  "aria-describedby"?: string;

  /** Torna o slider visível/renderizado mas não editável (diferente de disabled, que também remove do fluxo de tab). */
  readOnly?: boolean;

  /** Ordem de tabulação. @default 0 */
  tabIndex?: number;

  /** Foca o slider automaticamente ao montar. @default false */
  autoFocus?: boolean;

  /**
   * Chamado quando o usuário TERMINA de escolher um valor
   * (soltar o clique, ou tirar o foco depois de usar o teclado) —
   * diferente de onChange, que dispara a cada mudança intermediária.
   */
  onValueCommit?: (value: number) => void;

  /** Incremento usado pelas setas ←/→/↓/↑ do teclado. @default step */
  keyboardStep?: number;

  /** Incremento usado por PageUp/PageDown. @default step * 10 */
  largeStep?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A sleek liquid glass slider with iOS 26-inspired refraction effects.
 *
 * @example
 * ```tsx
 * <LiquidGlassSlider
 *   defaultValue={50}
 *   onChange={(value) => console.log("Value:", value)}
 * />
 * ```
 *
 * @example Custom colors
 * ```tsx
 * <LiquidGlassSlider
 *   fillColor="#22c55e"
 *   trackColor="#14532d44"
 * />
 * ```
 */
export const LiquidGlassSlider: React.FC<LiquidGlassSliderProps> = ({
  value: controlledValue,
  defaultValue = 10,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  onValueCommit,
  onDragStart,
  onDragEnd,
  className,
  width = 330,
  fillColor = "#0377F7",
  trackColor = "#89898F66",
  thumbColor = "rgba(255, 255, 255, 1)",
  disabled = false,
  readOnly = false,
  id,
  name,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
  tabIndex = 0,
  autoFocus = false,
  keyboardStep,
  largeStep,
  blur = 0,
  specularOpacity = 0.4,
  specularSaturation = 7,
  refractionLevel = 1,
}) => {
  const filterId = useId();
  const isControlled = controlledValue !== undefined;
  const isInteractive = !disabled && !readOnly;

  const step_kb = keyboardStep ?? step;
  const step_lg = largeStep ?? step * 10;
  // ─────────────────────────────────────────────────────────────────────────
  // Dimensions
  // ─────────────────────────────────────────────────────────────────────────
  const sliderHeight = 14;
  const thumbWidth = 90;
  const thumbHeight = 60;
  const thumbRadius = 30;
  const SCALE_REST = 0.6;
  const SCALE_DRAG = 1;
  const thumbWidthRest = thumbWidth * SCALE_REST;

  // ─────────────────────────────────────────────────────────────────────────
  // Motion Values
  // ─────────────────────────────────────────────────────────────────────────
  const internalValue = useMotionValue(defaultValue);
  const pointerDown = useMotionValue(0);

  // Refs
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  // Sync controlled value
  useEffect(() => {
    if (isControlled && controlledValue !== undefined) {
      internalValue.set(controlledValue);
    }
  }, [controlledValue, isControlled, internalValue]);

  // ─────────────────────────────────────────────────────────────────────────
  // Derived Motion Values
  // ─────────────────────────────────────────────────────────────────────────
  const isUp = useTransform((): number => (pointerDown.get() > 0.5 ? 1 : 0));

  const pressMultiplier = useTransform(isUp, [0, 1], [0.4, 0.9]);
  const scaleRatio = useSpring(
    useTransform([pressMultiplier], ([m]) => (Number(m) || 0) * refractionLevel)
  );

  const scaleSpring = useSpring(
    useTransform(isUp, [0, 1], [SCALE_REST, SCALE_DRAG]),
    { damping: 80, stiffness: 2000 }
  );

  const backgroundOpacity = useSpring(useTransform(isUp, [0, 1], [1, 0.1]), {
    damping: 80,
    stiffness: 2000,
  });

  const fillWidth = useTransform(internalValue, (v) => {
    const percent = ((v - min) / (max - min)) * 100;
    return `${Math.max(0, Math.min(100, percent))}%`;
  });

  const thumbX = useTransform(internalValue, (v) => {
    const percent = (v - min) / (max - min);
    const range = width - thumbWidth + thumbWidthRest / 1.5;
    return percent * range - thumbWidthRest / 3;
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Pointer Release Handler
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    function onPointerUp() {
      pointerDown.set(0);
    }
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("mouseup", onPointerUp);
    window.addEventListener("touchend", onPointerUp);
    return () => {
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchend", onPointerUp);
    };
  }, [pointerDown]);

  // ─────────────────────────────────────────────────────────────────────────
  // Value Update Handler
  // ─────────────────────────────────────────────────────────────────────────
  const updateValue = useCallback(
    (newValue: number) => {
      const steppedValue = Math.round(newValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));

      if (!isControlled) {
        internalValue.set(clampedValue);
      }
      onChange?.(clampedValue);
    },
    [min, max, step, isControlled, onChange, internalValue]
  );

  // ─────────────────────────────────────────────────────────────────────────
  // Drag Handlers
  // ─────────────────────────────────────────────────────────────────────────
  const handleDrag = useCallback(() => {
    if (!trackRef.current || !thumbRef.current) return;

    const track = trackRef.current.getBoundingClientRect();
    const thumb = thumbRef.current.getBoundingClientRect();

    const x0 = track.left + thumbWidthRest / 2;
    const x100 = track.right - thumbWidthRest / 2;
    const trackInsideWidth = x100 - x0;
    const thumbCenterX = thumb.left + thumb.width / 2;
    const x = Math.max(x0, Math.min(x100, thumbCenterX));
    const ratio = (x - x0) / trackInsideWidth;

    updateValue(ratio * (max - min) + min);
  }, [max, min, thumbWidthRest, updateValue]);

  const handleTrackClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const ratio = x / rect.width;
      updateValue(ratio * (max - min) + min);
    },
    [disabled, max, min, updateValue]
  );
  const currentValue = isControlled ? controlledValue! : internalValue.get();

  // ─── Teclado ─────────────────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isInteractive) return;

      const current = isControlled ? controlledValue! : internalValue.get();
      let next: number | null = null;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          next = current + step_kb;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          next = current - step_kb;
          break;
        case "PageUp":
          next = current + step_lg;
          break;
        case "PageDown":
          next = current - step_lg;
          break;
        case "Home":
          next = min;
          break;
        case "End":
          next = max;
          break;
        default:
          return;
      }

      e.preventDefault();
      updateValue(next);
      onValueCommit?.(Math.max(min, Math.min(max, next)));
    },
    [isInteractive, isControlled, controlledValue, internalValue, min, max, step_kb, step_lg, updateValue, onValueCommit]
  );

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div
      id={id}
      className={cn("relative select-none", disabled && "pointer-events-none opacity-50", className)}
      style={{ width, height: thumbHeight }}
    >
      {/* Track */}
      <motion.div
        ref={trackRef}
        style={{
          width,
          height: sliderHeight,
          left: 0,
          top: (thumbHeight - sliderHeight) / 2,
          backgroundColor: trackColor,
          borderRadius: sliderHeight / 2,
          position: "absolute",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        onClick={handleTrackClick}
        onMouseDown={() => !disabled && pointerDown.set(1)}
        onMouseUp={() => pointerDown.set(0)}
      >
        {/* Fill */}
        <div className="h-full w-full overflow-hidden rounded-full">
          <motion.div
            style={{
              height: sliderHeight,
              width: fillWidth,
              borderRadius: 6,
              backgroundColor: fillColor,
            }}
          />
        </div>
      </motion.div>

      {/* Refraction Filter */}
      <RefractionFilter
        id={filterId}
        width={thumbWidth}
        height={thumbHeight}
        radius={thumbRadius}
        bezelWidth={16}
        glassThickness={80}
        bezelType="convex_squircle"
        refractiveIndex={1.45}
        blur={blur}
        scaleRatio={scaleRatio}
        specularOpacity={specularOpacity}
        specularSaturation={specularSaturation}
      />

{/* input nativo escondido: garante compatibilidade com <form>, FormData, e submit nativo */}
      {name && (
        <input
          type="range"
          name={name}
          value={currentValue}
          min={min}
          max={max}
          step={step}
          readOnly
          hidden
          aria-hidden="true"
        />
      )}

      {/* Thumb */}
      <motion.div
        ref={thumbRef}
        role="slider"
        tabIndex={disabled ? -1 : tabIndex}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-valuenow={currentValue}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-disabled={disabled}
        aria-readonly={readOnly}
        autoFocus={autoFocus}
        onKeyDown={handleKeyDown}
        drag={isInteractive ? "x" : false}
        dragConstraints={{
          left: -thumbWidthRest / 3,
          right: width - thumbWidth + thumbWidthRest / 3,
        }}
        dragElastic={0.02}
        dragMomentum={false}
        onMouseDown={() => isInteractive && pointerDown.set(1)}
        onMouseUp={() => pointerDown.set(0)}
        onDragStart={() => {
          pointerDown.set(1);
          onDragStart?.();
        }}
        onDrag={handleDrag}
        onDragEnd={() => {
          pointerDown.set(0);
          onValueCommit?.(isControlled ? controlledValue! : internalValue.get());
          onDragEnd?.();
        }}
        className="absolute focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        style={{
          height: thumbHeight,
          width: thumbWidth,
          top: 0,
          x: thumbX,
          borderRadius: thumbRadius,
          backdropFilter: `url(#${filterId})`,
          scale: scaleSpring,
          cursor: disabled ? "not-allowed" : "pointer",
          backgroundColor: useTransform(backgroundOpacity, (op) =>
            thumbColor.replace(/[\d.]+\)$/, `${op})`)
          ),
          boxShadow: "0 3px 14px rgba(0,0,0,0.1)",
        }}
      />
    </div>
  );
};