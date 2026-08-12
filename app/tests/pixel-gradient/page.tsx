'use client'
import { useState } from 'react'; // Adicionado para rastrear o mouse
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GlassElement } from '@/components/GlassElement/GlassElement';

export default function PixelGradient() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <div className="relative w-full h-full overflow-hidden bg-black rounded-4xl"
      onMouseMove={(e) => {
        // O valor 0.5 define o centro. 
        // O valor 50 define o deslocamento máximo em pixels.
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;

        // Alterado de 25 para 50 para dobrar a intensidade
        setMousePos({ x: x * 50, y: y * 0 });
      }}>

      {/* Camada móvel: Envolve o Gradiente e o Ruído */}
      <div
        className="absolute inset-[-10%] transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`
        }}
      >
        <div className="absolute inset-0 bg-red-500" />

        <div
          className="absolute inset-0 -rotate-45 scale-[2] opacity-80 filter blur-[3px] animate-float-up"
          style={{
            backgroundImage: `linear-gradient(-45deg, 
                transparent 0%,
                rgb(0, 0, 0 ) 0%, 
                rgb(0, 0, 0 ) 1%, 
                rgba(0, 0, 0, 0) 50%,
                rgb(0, 0, 0 ) 99%,
                rgb(0, 0, 0 ) 100%,
                transparent 100%
              )`,
            backgroundRepeat: 'repeat',
            backgroundSize: "100px 100px",
          }}
        />

        <div
          className="absolute inset-0 opacity-20 saturate-0 filter blur-[3px] animate-float-up"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Conteúdo centralizado (Fixado, não move) */}
      <div className='relative z-10 flex flex-col gap-1 items-center justify-end h-auto w-full p-20 text-white bg-[#00000000] bg-[linear-gradient(0deg,_rgba(0,_0,_0,_0)_0%,_rgba(0,_0,_0,_1)_100%)]'>
        <h1 className="text-4xl font-semibold tracking-tight">Life os 2</h1>
        <span className="text-neutral-400 text-lg">Um unico sistema para todos</span>
          <Button variant='outline' className="group/button inline-flex shrink-0 items-center justify-center rounded-4xl border bg-clip-padding whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:bg-transparent dark:hover:bg-input/30 h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 text-[1rem] font-semibold text-zinc-600 dark:text-zinc-300 hover:scale-120 backdrop-blur-2xl">Login</Button>
      </div>
    </div>
  )
}