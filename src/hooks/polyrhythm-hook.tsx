import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Rhythm } from '../lib/polyrhythm'
import { Point } from '../types/canvas-types'
import { usePolyrhythmConfig } from './polyrhythm-config-hook'
import { useTransport } from './transport-hook'

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
  const transport = useTransport()

  useEffect(() => {
    const { timeSignature, ppq } = transport.get()

    polyrhythm.forEach((rhythm) => {
      const vertexTick = Math.round((timeSignature * ppq) / rhythm.interval)
      for (let i = 0; i < rhythm.interval; i++) {
        transport.schedule(
          (time) => {
            rhythm.beepSynth.triggerAttackRelease(rhythm.note, time, 0.005)
          },
          `${vertexTick * i}i`,
        )
      }
    })

    return () => {
      transport.cancel(0)
    }
  }, [polyrhythm])

  const actions: PolyrhythmActions = useMemo(
    () => ({
      register: (position: Point) => {
        const id = polyrhythm.length
        setPolyrhythm(polyrhythm.concat(new Rhythm(id, polyrhythmConfig, position)))
      },
      deregister: () => {
        const rhythm = polyrhythm.at(-1)
        rhythm && rhythm.dispose()
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
