"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Star, PartyPopper } from "lucide-react"
import { Button } from "@/components/ui/button"

const PARTICLE_ICONS = [Sparkles, Star, PartyPopper]

type Particle = {
  id: number
  angle: number
  distance: number
  Icon: typeof Sparkles
}

export function CelebrateButton({ label = "Comemorar" }: { label?: string }) {
  const [particles, setParticles] = useState<Particle[]>([])

  function burst() {
    const next: Particle[] = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      angle: (i / 10) * 360 + Math.random() * 20,
      distance: 40 + Math.random() * 30,
      Icon: PARTICLE_ICONS[Math.floor(Math.random() * PARTICLE_ICONS.length)],
    }))
    setParticles(next)
    setTimeout(() => setParticles([]), 700)
  }

  return (
    <div className="relative inline-block">
      <Button onClick={burst} variant="outline" size="sm" className="gap-2 rounded-full">
        <PartyPopper size={14} />
        {label}
      </Button>

      <AnimatePresence>
        {particles.map(({ id, angle, distance, Icon }) => {
          const rad = (angle * Math.PI) / 180
          const x = Math.cos(rad) * distance
          const y = Math.sin(rad) * distance
          return (
            <motion.div
              key={id}
              className="absolute top-1/2 left-1/2 pointer-events-none text-amber-500"
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
              animate={{ x, y, opacity: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Icon size={14} />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}