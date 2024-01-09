import React, { ChangeEvent, useEffect, useState } from 'react'
import { usePolyrhythmConfig } from '../../../../hooks/polyrhythm-config-hook'

const IntervalController = () => {
  const polyrhythmConfig = usePolyrhythmConfig()
  const [interval, setInterval] = useState<number>(() => polyrhythmConfig.interval)

  const handleInterval = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setInterval(target.valueAsNumber)
  }

  useEffect(() => {
    polyrhythmConfig.interval = interval
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
        <input type="range" id="interval" min={3} max={12} onChange={onChange} value={interval} />
      </section>
    </div>
  )
}
