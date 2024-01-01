import React, { createContext, useContext } from 'react'
import { PolyrhythmManager } from '../lib/polyrhythm'

const PolyrhythmManagerContext = createContext<PolyrhythmManager | null>(null)

export const PolyrhythmManagerProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PolyrhythmManagerContext.Provider value={new PolyrhythmManager()}>{children}</PolyrhythmManagerContext.Provider>
  )
}

export const usePolyrhythmManager = () => useContext(PolyrhythmManagerContext)
