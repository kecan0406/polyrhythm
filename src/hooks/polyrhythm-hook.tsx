import React, { createContext, RefObject, useContext, useEffect, useRef, useState } from 'react'
import * as Tone from 'tone'
import { Volume } from 'tone'
import { Transport } from 'tone/build/esm/core/clock/Transport'
import { getBeepSynth } from '../lib/instruments'
import { getRandomInterval } from '../lib/utils/rhythm-util'
import { Point } from '../types/canvas-types'
import { Rhythm } from '../types/polyrhythm-types'
import { useInteractionValue } from './interaction-hook'

const PolyrhythmContext = createContext<Rhythm[]>([])

export const PolyrhythmProvider = ({ children }: { children: React.ReactNode }) => {
  const [polyrhythm, setPolyrhythm] = useState<Rhythm[]>([])
  const transport = useTransport()
  const volume = useVolume()

  const interaction = useInteractionValue()
  useEffect(() => {
    if (!interaction) return

    switch (interaction.type) {
      case 'click':
        registerRhythm(interaction.value)
        break
      case 'contextmenu':
        deregisterRhythm()
        break
    }
  }, [interaction])

  const registerRhythm = (position: Point) => {
    const interval = getRandomInterval()
    const beepSynth = getBeepSynth().connect(volume!)

    const id = transport!.scheduleRepeat((time) => {
      beepSynth.triggerAttackRelease('C4', time, 0.05)
    }, interval)

    const rhythm: Rhythm = { id, interval, position }
    setPolyrhythm(polyrhythm.concat(rhythm))
  }

  const deregisterRhythm = () => {
    if (!polyrhythm.length) return

    const { id } = polyrhythm.at(-1)!
    id !== undefined && transport!.clear(id)

    setPolyrhythm(polyrhythm.slice(0, -1))
  }

  return <PolyrhythmContext.Provider value={polyrhythm}>{children}</PolyrhythmContext.Provider>
}

export const usePolyrhythm = () => useContext(PolyrhythmContext)

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
