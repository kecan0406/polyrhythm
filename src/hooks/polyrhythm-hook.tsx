import React, { createContext, RefObject, useContext, useEffect, useRef, useState } from 'react'
import * as Tone from 'tone'
import { Volume } from 'tone'
import { Transport } from 'tone/build/esm/core/clock/Transport'
import { Draw } from 'tone/build/esm/core/util/Draw'
import { getBeepSynth } from '../lib/instruments'
import { polyrhythmNotes } from '../lib/sample'
import { getRandomIntInclusive } from '../lib/utils/Math'
import { Point } from '../types/canvas-types'
import { useInteractionValue } from './interaction-hook'

type PolyrhythmId = { id: number; interval: string; point: Point }
const PolyrhythmManagerContext = createContext<PolyrhythmId[]>([])

export const PolyrhythmManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [polyrhythmIds, setPolyrhythmIds] = useState<PolyrhythmId[]>([])
  const transport = useTransport()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const draw = useDraw()
  const volume = useVolume()

  const registerPolyrhythm = (transport: Transport, volume: Volume, point: Point) => {
    const interval = `${getRandomIntInclusive(3, 5)}n`
    const beepSynth = getBeepSynth().connect(volume)
    const { note } = polyrhythmNotes.find((note) => note.interval === interval)!
    const id = transport.scheduleRepeat((time) => {
      beepSynth.triggerAttackRelease(note, time, 0.05)
    }, interval)
    setPolyrhythmIds(polyrhythmIds.concat({ id, interval, point }))
  }

  const deregisterPolyrhythm = (transport: Transport) => {
    if (!polyrhythmIds.length) return

    const { id } = polyrhythmIds.at(-1)!
    setPolyrhythmIds(polyrhythmIds.slice(0, -1))
    id !== undefined && transport.clear(id)
  }

  const interaction = useInteractionValue()
  useEffect(() => {
    if (!interaction || !transport || !volume) return
    switch (interaction.type) {
      case 'click':
        registerPolyrhythm(transport, volume, interaction.value)
        break
      case 'contextmenu':
        deregisterPolyrhythm(transport)
        break
    }
  }, [interaction])

  return <PolyrhythmManagerContext.Provider value={polyrhythmIds}>{children}</PolyrhythmManagerContext.Provider>
}

export const usePolyrhythmManager = () => useContext(PolyrhythmManagerContext)

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

const useDraw = () => {
  const drawRef: RefObject<Draw> = useRef<Draw>(Tone.getDraw())
  return drawRef.current
}
