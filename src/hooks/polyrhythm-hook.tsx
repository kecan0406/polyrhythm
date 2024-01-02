import React, { createContext, RefObject, useEffect, useRef, useState } from 'react'
import * as Tone from 'tone'
import { Volume } from 'tone'
import { Transport } from 'tone/build/esm/core/clock/Transport'
import { Draw } from 'tone/build/esm/core/util/Draw'
import { getBeepSynth } from '../lib/instruments'
import { getRandomIntInclusive } from '../lib/utils/Math'
import { useInteractionValue } from './interaction-hook'

const PolyrhythmManagerContext = createContext(null)

export const PolyrhythmManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [polyrhythmIds, setPolyrhythmIds] = useState<number[]>([])
  const transport = useTransport()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const draw = useDraw()
  const volume = useVolume()

  const registerPolyrhythm = (transport: Transport, volume: Volume) => {
    const interval = `${getRandomIntInclusive(3, 8)}n`
    const beepSynth = getBeepSynth().connect(volume)
    const id = transport.scheduleRepeat((time) => {
      beepSynth.triggerAttackRelease('C2', time, 0.05)
    }, interval)
    setPolyrhythmIds(polyrhythmIds.concat(id))
  }

  const deregisterPolyrhythm = (transport: Transport) => {
    const id = polyrhythmIds.at(-1)
    setPolyrhythmIds(polyrhythmIds.slice(0, -1))
    id !== undefined && transport.clear(id)
  }

  const interaction = useInteractionValue()
  useEffect(() => {
    if (!interaction || !transport || !volume) return
    switch (interaction.type) {
      case 'click':
        registerPolyrhythm(transport, volume)
        break
      case 'contextmenu':
        deregisterPolyrhythm(transport)
        break
    }
  }, [interaction])

  return <PolyrhythmManagerContext.Provider value={null}>{children}</PolyrhythmManagerContext.Provider>
}

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
