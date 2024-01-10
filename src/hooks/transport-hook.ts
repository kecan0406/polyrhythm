import { RefObject, useEffect, useRef } from 'react'
import { getTransport } from 'tone'
import { Transport } from 'tone/build/esm/core/clock/Transport'
import { usePolyrhythmValue } from './polyrhythm-hook'

export const useTransport = (): Transport => {
  const polyrhythm = usePolyrhythmValue()
  const transportRef: RefObject<Transport> = useRef<Transport>(getTransport())

  useEffect(() => {
    const transport = transportRef.current!
    transport.loop = true
    transport.loopStart = 0
    transport.loopEnd = '1m'
    transport.timeSignature = [4, 4]
    transport.start(0)
  }, [])

  useEffect(() => {
    const transport = transportRef.current!

    const totalMeasure = transport.toTicks(transport.loopEnd)
    polyrhythm.forEach((rhythm) => {
      const beats = Math.round(totalMeasure / rhythm.interval)
      rhythm.beats = beats
      for (let count = 0; count <= rhythm.interval; count++) {
        const ticks = beats * count
        transport.schedule((time) => {
          rhythm.beepSynth.triggerAttackRelease(rhythm.note, time, 0.005)
        }, `${ticks}i`)
      }
    })

    return () => {
      transport.cancel(0)
    }
  }, [polyrhythm])

  return transportRef.current!
}
