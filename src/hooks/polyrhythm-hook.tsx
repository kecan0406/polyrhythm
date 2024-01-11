import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getTransport } from 'tone'
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

  useEffect(() => {
    const transport = getTransport()
    transport.loop = true
    transport.loopStart = 0
    transport.loopEnd = '1m'
    transport.timeSignature = [4, 4]
    transport.start(0)
  }, [])

  useEffect(() => {
    const transport = getTransport()
    const measure = transport.toTicks('1m')

    polyrhythm.forEach((rhythm) => {
      const vertexTick = Math.round(measure / rhythm.interval)
      for (let ticks = 0; ticks < measure; ticks += vertexTick) {
        transport.schedule((time) => {
          rhythm.beepSynth.triggerAttackRelease(rhythm.note, time, 0.005)
        }, `${ticks}i`)
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
        rhythm && rhythm.beepSynth.dispose()
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
