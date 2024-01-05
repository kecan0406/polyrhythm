import React, { ChangeEvent, useEffect, useState } from 'react'
import { Rhythm } from '../../../../lib/polyrhythm'
import { parseVertex } from '../../../../lib/utils/math-util'

type RhythmIntervalControllerProps = { rhythm: Rhythm }
const RhythmIntervalController = ({ rhythm }: RhythmIntervalControllerProps) => {
  const [interval, setInterval] = useState<number>(() => parseVertex(rhythm.getInterval()))

  useEffect(() => {
    setInterval(parseVertex(rhythm.getInterval()))
  }, [rhythm])

  const handleInterval = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const interval = target.valueAsNumber
    setInterval(interval)
    rhythm.setInterval(`${interval}n`)
    rhythm.resetRepeat()
  }

  return <RhythmIntervalControllerUI interval={interval} onChange={handleInterval} />
}
export default RhythmIntervalController

type RhythmIntervalControllerUIProps = { interval: number; onChange: (e: ChangeEvent<HTMLInputElement>) => void }
const RhythmIntervalControllerUI = ({ interval, onChange }: RhythmIntervalControllerUIProps) => {
  return (
    <div className="IntervalController">
      <section>
        <label htmlFor="interval">Interval : {interval}</label>
        <input type="range" id="interval" min={3} max={6} onChange={onChange} value={interval} />
      </section>
    </div>
  )
}
