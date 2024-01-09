import { useEffect } from 'react'
import { getTransport } from 'tone'
import { Rhythm } from '../lib/polyrhythm'

export const useScheduler = (polyrhythm: Rhythm[]) => {
  useEffect(() => {
    const transport = getTransport()
    transport.loop = true
    transport.loopStart = 0
    transport.loopEnd = '1m'
    transport.timeSignature = [4, 4]
  }, [])

  useEffect(() => {
    const transport = getTransport()

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
}
