import React, { ChangeEvent, useEffect, useState } from 'react'
import { usePolyrhythmActions } from '../../../hooks/polyrhythm-hook'
const VolumeController = () => {
  const polyrhythmActions = usePolyrhythmActions()
  const [volume, setVolume] = useState<number>(-90)

  const handleVolume = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setVolume(target.valueAsNumber)
  }

  useEffect(() => {
    polyrhythmActions.setVolume(volume)
  }, [volume])

  return (
    <div className="VolumeController">
      <section>
        <label htmlFor="Volume">Volume : {volume}</label>
        <input id="Volume" type="range" min={-90} max={0} value={volume} onChange={handleVolume} />
      </section>
    </div>
  )
}
export default VolumeController
