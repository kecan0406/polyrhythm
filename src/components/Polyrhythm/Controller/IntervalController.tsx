import React, { ChangeEvent, useEffect, useState } from 'react'
import { usePolyrhythmActions } from '../../../hooks/polyrhythm-hook'
import { getRandomInterval } from '../../../lib/utils/rhythm-util'
const IntervalController = () => {
  const polyrhythmActions = usePolyrhythmActions()
  const [interval, setInterval] = useState<number>(3)
  const [isRandom, setIsRandom] = useState<boolean>(false)

  const handleInterval = (e: ChangeEvent<HTMLInputElement>) => {
    setInterval(e.target.valueAsNumber)
  }

  const handleIsRandom = (e: ChangeEvent<HTMLInputElement>) => {
    setIsRandom(e.target.checked)
  }

  useEffect(() => {
    polyrhythmActions.setInterval(isRandom ? getRandomInterval() : `${interval}n`)
  }, [interval])

  return (
    <div className="IntervalController">
      <section>
        <label htmlFor="interval">Interval</label>
        <input type="range" id="interval" max={6} min={3} onChange={handleInterval} value={interval} />
      </section>
      <section>
        <label htmlFor="randomInterval">Random</label>
        <input type="checkbox" id="randomInterval" onChange={handleIsRandom} checked={isRandom} />
      </section>
    </div>
  )
}
export default IntervalController
