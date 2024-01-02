import React, { createContext, RefObject, useContext, useEffect, useRef, useState } from 'react'
import * as Tone from 'tone'
import { Volume } from 'tone'
import { Transport } from 'tone/build/esm/core/clock/Transport'
import { getBeepSynth } from '../lib/instruments'
import { getRandomInt } from '../lib/utils/Math'
import { Point } from '../types/canvas-types'
import { useInteractionValue } from './interaction-hook'

type Polyrhythm = { id: number; interval: string; position: Point }
const PolyrhythmContext = createContext<Polyrhythm[]>([])

export const PolyrhythmProvider = ({ children }: { children: React.ReactNode }) => {
  const [polyrhythm, setPolyrhythm] = useState<Polyrhythm[]>([])
  const transport = useTransport()
  const volume = useVolume()

  const interaction = useInteractionValue()
  useEffect(() => {
    if (!interaction) return

    switch (interaction.type) {
      case 'click':
        registerPolyrhythm(interaction.value)
        break
      case 'contextmenu':
        deregisterPolyrhythm()
        break
    }
  }, [interaction])

  const registerPolyrhythm = (position: Point) => {
    const interval = `${getRandomInt(3, 5)}n`
    const beepSynth = getBeepSynth().connect(volume!)

    const id = transport!.scheduleRepeat((time) => {
      beepSynth.triggerAttackRelease('C4', time, 0.05)
    }, interval)

    setPolyrhythm(polyrhythm.concat({ id, interval, position }))
  }

  const deregisterPolyrhythm = () => {
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
