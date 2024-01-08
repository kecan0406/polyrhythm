import { useEffect } from 'react'
import { getTransport } from 'tone'
import { Rhythm } from '../lib/polyrhythm'

export const useScheduler = (polyrhythm: Rhythm[]) => {
  useEffect(() => {
    const transport = getTransport()
    transport.loop = true
    transport.loopStart = 0
    transport.loopEnd = '768i'
    transport.timeSignature = [4, 4]
  }, [])

  useEffect(() => {
    const transport = getTransport()

    polyrhythm.forEach((rhythm) => {
      const beat = Math.round(768 / rhythm.interval)
      for (let cur = 0; cur <= rhythm.interval; cur++) {
        transport.schedule(
          (time) => {
            rhythm.beepSynth.triggerAttackRelease(rhythm.note, time, 0.005)
          },
          `${beat * cur}i`,
        )
      }
    })

    return () => {
      transport.cancel(0)
    }
  }, [polyrhythm])
}
