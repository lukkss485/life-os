// hooks/use-fps.ts (novo)
"use client"

import { useEffect, useRef, useState } from "react"

export function useFps() {
  const [fps, setFps] = useState(0)
  const frames = useRef(0)
  const lastTime = useRef(performance.now())
  const rafId = useRef(0)

  useEffect(() => {
    function tick(now: number) {
      frames.current++
      const elapsed = now - lastTime.current
      if (elapsed >= 500) {
        setFps(Math.round((frames.current * 1000) / elapsed))
        frames.current = 0
        lastTime.current = now
      }
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId.current)
  }, [])

  return fps
}