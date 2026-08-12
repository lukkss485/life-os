// contexts/glass-config-context.tsx
"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { getGlassConfig } from "@/lib/glass-config-storage"
import { GlassConfig, DEFAULT_GLASS_CONFIG } from "@/types/glass-config"

const GlassConfigContext = createContext<GlassConfig>(DEFAULT_GLASS_CONFIG)

export function GlassConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<GlassConfig>(DEFAULT_GLASS_CONFIG)

  useEffect(() => {
    getGlassConfig().then(setConfig)
  }, [])

  return (
    <GlassConfigContext.Provider value={config}>
      {children}
    </GlassConfigContext.Provider>
  )
}

export function useGlassConfig() {
  return useContext(GlassConfigContext)
}