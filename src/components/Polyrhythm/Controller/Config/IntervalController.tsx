import React, { ChangeEvent, useEffect, useState } from 'react'
import { usePolyrhythmActions } from '../../../../hooks/polyrhythm-hook'

const IntervalController = () => {
  const polyrhythmActions = usePolyrhythmActions()
  const [interval, setInterval] = useState<number>(3)

  const handleInterval = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setInterval(target.valueAsNumber)
  }

  useEffect(() => {
    polyrhythmActions.setInterval(interval)
  }, [interval])

  return <IntervalControllerUI interval={interval} onChange={handleInterval} />
}
export default IntervalController

type IntervalControllerUIProps = { interval: number; onChange: (e: ChangeEvent<HTMLInputElement>) => void }
const IntervalControllerUI = ({ interval, onChange }: IntervalControllerUIProps) => {
  return (
    <div className="IntervalController">
      <section>
        <label htmlFor="interval">Interval : {interval}</label>
        <input type="range" id="interval" min={3} max={6} onChange={onChange} value={interval} />
      </section>
    </div>
  )
}
