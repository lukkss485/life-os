'use client';
import { creator } from "@/creator";
import { GlassElement } from "@/components/GlassElement/GlassElement";
import Image from "next/image"; // Importe o componente otimizado
import "../../globals.css"
import Draggable from 'react-draggable';
import * as React from "react";

export default function LiquidGlass() {
  const images = [
    "/AS11-40-5865HR.webp",
    "/AS11-40-5872HR.webp",
    "/AS11-40-5877HR.webp",
    "/AS11-40-5899HR.webp",
    "/AS11-40-5902HR.webp",
    "/AS11-40-6642HR.webp",
  ];
  return (
    <main className="min-h-screen min-w-screen relative">
      <div className="overlay z-100">
        <GlassElement
          width={200}
          height={200}
          radius={200}
          depth={10}
          blur={0}
          strength={300}
          chromaticAberration={0}
          debug
          className="index-20 "
        />
        <GlassElement
          width={200}
          height={200}
          radius={200}
          depth={10}
          blur={0}
          strength={300}
          chromaticAberration={0}
          className="index-20"
        />
      </div>
      <AlturaElemento />
      {/* Mapeamento das imagens de forma dinâmica */}
      {images.map((src, index) => (
        <Image
          key={index}
          src={src} // O Next.js busca na pasta public automaticamente
          alt={`Imagem ${index}`}
          width={800}
          height={600}
        />
      ))}

    </main>
  )
}
export function SquircleBox({
  children,
  rounded = 10,
  className
}: {
  children?: React.ReactNode,
  rounded?: number,
  className?: string
}) {
  // O valor do 'rx' controla o arredondamento (corner radius)
  const id = `squircle-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={className} style={{ position: 'relative' }}>
      <svg width="0" height="0">
        <defs>
          <mask id={id}>
            <rect
              x="0" y="0" width="100%" height="100%"
              rx={rounded}
              fill="white"
            />
          </mask>
        </defs>
      </svg>

      <div
        style={{
          mask: `url(#${id})`,
          WebkitMask: `url(#${id})`,
          width: '100%',
          height: '100%'
        }}
      >
        {children}
      </div>
    </div>
  );
}


export function AlturaElemento() {
  var timer = 1000;
  const meuElementoRef = useRef<HTMLDivElement | null>(null);


  const [altura, setAltura] = useState<number>(0);

  useEffect(() => {
    const atualizarAltura = () => {
      if (meuElementoRef.current) {
        setAltura(meuElementoRef.current.offsetHeight);
      }
    };

    atualizarAltura();

    const intervalo = setInterval(atualizarAltura, timer);

    return () => clearInterval(intervalo);
  }, []);


  const [largura, setLargura] = useState<number>(0);


  useEffect(() => {
    const atualizarLargura = () => {
      if (meuElementoRef.current) {
        setLargura(meuElementoRef.current.offsetWidth);
      }
    };

    atualizarLargura();

    const intervalo = setInterval(atualizarLargura, timer);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div>
      <div
        ref={meuElementoRef}
        style={{ height: '100px', width: '100px', background: '#000', marginBottom: '800px' }}
       />

      <p className="translate-x-200">A altura do elemento é: {altura}px</p>
      <br />
      
      <p className="translate-x-200">A largura do elemento é: {largura}px</p>
    </div>
  );
}

//

//

import { useState, useRef, useEffect } from 'react';

export function elementSize(){
  const [altura, setAltura] = useState<number>(0);
  const [largura, setLargura] = useState<number>(0);
  
  const meuElementoRef = useRef<HTMLDivElement | null>(null);
  const timer = 1000;

  useEffect(() => {
    const atualizarDimensoes = () => {
      if (meuElementoRef.current) {
        setAltura(meuElementoRef.current.offsetHeight);
        setLargura(meuElementoRef.current.offsetWidth);
      }
    };

    atualizarDimensoes();

    const intervalo = setInterval(atualizarDimensoes, timer);

    return () => clearInterval(intervalo);
  }, [timer]);

  return [largura , altura]
}