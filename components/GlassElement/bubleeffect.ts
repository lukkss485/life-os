'use client';
import { useState, useRef } from 'react';

/**
 * @param baseW - Largura base
 * @param baseH - Altura base
 * @param baseRadius - Raio base (se não informado, calcula automaticamente)
 * @param intensity - O quanto ele cresce (ex: 0.2)
 * @param springStrength - O "overshoot" do Bézier (ex: 2.1)
 * @param duration - Rapidez (ex: 500ms)
 */
export function useGlassBounce(
  baseW: number,
  baseH: number,
  baseRadius?: number, // Novo parâmetro opcional
  intensity: number = 0.2,
  springStrength: number = 2.1,
  duration: number = 500
) {
  // Define o raio inicial: usa o fornecido ou o cálculo padrão
  const initialRadius = baseRadius ?? (Math.min(baseW, baseH) / 2);

  const [values, setValues] = useState({
    width: baseW,
    height: baseH,
    radius: initialRadius,
    deph: baseH / 22
  });

  const requestRef = useRef<number>(0);
  const startTime = useRef<number>(0);
  const currentAction = useRef<'enter' | 'leave' | null>(null);

  const cubicBezier = (t: number, strength: number) => {
    const y1 = 0.885;
    const y2 = strength;
    const solve = (a: number, b: number, c: number, d: number, t: number) => 
      Math.pow(1 - t, 3) * a + 3 * Math.pow(1 - t, 2) * t * b + 3 * (1 - t) * Math.pow(t, 2) * c + Math.pow(t, 3) * d;
    return solve(0, y1, y2, 1, t);
  };

  const animate = (type: 'enter' | 'leave') => {
    if (currentAction.current === type) return;
    
    cancelAnimationFrame(requestRef.current);
    startTime.current = 0;
    currentAction.current = type;

    const run = (time: number) => {
      if (!startTime.current) startTime.current = time;
      const elapsed = time - startTime.current;
      const progress = Math.min(elapsed / duration, 1);

      const scale = type === 'enter' 
        ? 1 + (cubicBezier(progress, springStrength) * intensity)
        : 1 + ((1 - cubicBezier(progress, springStrength)) * intensity);

      setValues({
        width: baseW * scale,
        height: baseH * scale,
        radius: initialRadius * scale, // Usa o valor base controlado
        deph: (initialRadius / 18.7997) * scale
      });

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(run);
      } else {
        currentAction.current = null;
        if (type === 'leave') {
           setValues({ 
             width: baseW, 
             height: baseH, 
             radius: initialRadius, 
             deph: (initialRadius / 18.7997)
           });
        }
      }
    };

    requestRef.current = requestAnimationFrame(run);
  };

  return { 
    values, 
    onMouseEnter: () => animate('enter'), 
    onMouseLeave: () => animate('leave')
  };
}