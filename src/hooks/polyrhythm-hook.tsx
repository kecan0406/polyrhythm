import React, { createContext, RefObject, useContext, useEffect, useMemo, useRef, useState } from 'react'
import * as Tone from 'tone'
import { Volume } from 'tone'
import { Transport } from 'tone/build/esm/core/clock/Transport'
import { getBeepSynth } from '../lib/instruments'
import { getRandomInterval } from '../lib/utils/rhythm-util'
import { Point } from '../types/canvas-types'
import { Rhythm } from '../types/polyrhythm-types'

type PolyrhythmActions = {
  register: (position: Point) => void
  deregister: () => void
}
const PolyrhythmValueContext = createContext<Rhythm[]>([])
const PolyrhythmActionsContext = createContext<PolyrhythmActions>({
  register: () => {},
  deregister: () => {},
})

export const PolyrhythmProvider = ({ children }: { children: React.ReactNode }) => {
  const [polyrhythm, setPolyrhythm] = useState<Rhythm[]>([])
  const transport = useTransport()
  const volume = useVolume()

  const actions: PolyrhythmActions = useMemo(
    () => ({
      register: (position: Point) => {
        const interval = getRandomInterval()
        const beepSynth = getBeepSynth().connect(volume!)

        const id = transport!.scheduleRepeat((time) => {
          beepSynth.triggerAttackRelease('C4', time, 0.05)
        }, interval)

        const rhythm: Rhythm = { id, interval, position }
        setPolyrhythm(polyrhythm.concat(rhythm))
      },
      deregister: () => {
        const rhythm = polyrhythm.at(-1)
        rhythm && transport!.clear(rhythm.id)
        setPolyrhythm(polyrhythm.slice(0, -1))
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

const useTransport = () => {
  const transportRef: RefObject<Transport> = useRef<Transport>(Tone.getTransport())
  useEffect(() => {
    const transport = transportRef.current!
    transport.start(0)
  }, [])
  return transportRef.current
}

const useVolume = () => {
  const volumeRef: RefObject<Volume> = useRef<Volume>(new Tone.Volume(-20).toDestination())
  return volumeRef.current
}
