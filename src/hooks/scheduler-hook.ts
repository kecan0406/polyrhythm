import { useEffect } from 'react'
import { getDraw, getTransport } from 'tone'
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
    const draw = getDraw()

    const totalMeasure = transport.toTicks(transport.loopEnd)
    polyrhythm.forEach((rhythm) => {
      const beats = Math.round(totalMeasure / rhythm.interval)
      for (let time = 0; time <= rhythm.interval; time++) {
        const beat = `${beats * time}i`
        transport.schedule((time) => {
          rhythm.beepSynth.triggerAttackRelease(rhythm.note, time, 0.005)
          draw.schedule(() => {
            //animate
          }, time)
        }, beat)
      }
    })

    return () => {
      transport.cancel(0)
    }
  }, [polyrhythm])
}
