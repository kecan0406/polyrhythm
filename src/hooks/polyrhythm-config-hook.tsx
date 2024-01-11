import React, { createContext, RefObject, useContext, useRef } from 'react'
import { Note } from 'tone/build/esm/core/type/NoteUnits'

export type PolyrhythmConfig = {
  interval: number
  note: Note
}
const initialPolyrhythmConfig: PolyrhythmConfig = { interval: 3, note: 'C5' }
const PolyrhythmConfigContext = createContext<PolyrhythmConfig | null>(initialPolyrhythmConfig)

export const PolyrhythmConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const polyrhythmConfigRef: RefObject<PolyrhythmConfig> = useRef<PolyrhythmConfig>(initialPolyrhythmConfig)

  return (
    <PolyrhythmConfigContext.Provider value={polyrhythmConfigRef.current}>{children}</PolyrhythmConfigContext.Provider>
  )
}

export const usePolyrhythmConfig = () => {
  const context = useContext(PolyrhythmConfigContext)
  if (!context) throw Error('usePolyrhythmConfig must be used within PolyrhythmConfigProvider')
  return context
}
