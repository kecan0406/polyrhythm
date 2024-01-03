import React, { ChangeEvent, useEffect, useState } from 'react'
import { usePolyrhythmActions } from '../../../hooks/polyrhythm-hook'
const IntervalController = () => {
  const polyrhythmActions = usePolyrhythmActions()
  const [interval, setInterval] = useState<number>(3)

  const handleInterval = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setInterval(target.valueAsNumber)
  }

  useEffect(() => {
    polyrhythmActions.setInterval(`${interval}n`)
  }, [interval])

  return (
    <div className="IntervalController">
      <section>
        <label htmlFor="interval">Interval : {interval}</label>
        <input type="range" id="interval" min={3} max={6} onChange={handleInterval} value={interval} />
      </section>
    </div>
  )
}
export default IntervalController
