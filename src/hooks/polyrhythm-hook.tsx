import React, { createContext, RefObject, useContext, useRef } from 'react'
import { PolyrhythmManager } from '../lib/polyrhythm'

export const PolyrhythmContext = createContext<RefObject<PolyrhythmManager> | null>(null)

export const PolyrhythmProvider = ({ children }: { children: React.ReactNode }) => {
  const polyrhythmManagerRef: RefObject<PolyrhythmManager> = useRef<PolyrhythmManager>(new PolyrhythmManager())

  return <PolyrhythmContext.Provider value={polyrhythmManagerRef}>{children}</PolyrhythmContext.Provider>
}

export const usePolyrhythm = () => useContext(PolyrhythmContext)
