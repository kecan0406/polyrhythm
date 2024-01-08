import React, { createContext, useContext, useMemo, useState } from 'react'
import { Rhythm } from '../lib/polyrhythm'
import { Point } from '../types/canvas-types'
import { usePolyrhythmConfig } from './polyrhythm-config-hook'

type PolyrhythmActions = {
  register: (position: Point) => void
  deregister: () => void
  reset: () => void
}
const PolyrhythmValueContext = createContext<Rhythm[]>([])
const PolyrhythmActionsContext = createContext<PolyrhythmActions>({
  register: () => {},
  deregister: () => {},
  reset: () => {},
})

export const PolyrhythmProvider = ({ children }: { children: React.ReactNode }) => {
  const [polyrhythm, setPolyrhythm] = useState<Rhythm[]>([])
  const polyrhythmConfig = usePolyrhythmConfig()

  const actions: PolyrhythmActions = useMemo(
    () => ({
      register: (position: Point) => {
        const id = polyrhythm.length
        const rhythm = new Rhythm(id, polyrhythmConfig.note, polyrhythmConfig.interval, position)
        setPolyrhythm(polyrhythm.concat(rhythm))
      },
      deregister: () => {
        setPolyrhythm(polyrhythm.slice(0, -1))
      },
      reset: () => {
        setPolyrhythm([...polyrhythm])
      },
    }),
    [polyrhythm],
  )

  return (
    <PolyrhythmActionsContext.Provider value={actions}>
      <PolyrhythmValueContext.Provider value={polyrhythm}>{children}</PolyrhythmValueContext.Provider>
    </PolyrhythmActionsContext.Provider>
  )
}

export const usePolyrhythmValue = () => useContext(PolyrhythmValueContext)
export const usePolyrhythmActions = () => useContext(PolyrhythmActionsContext)
