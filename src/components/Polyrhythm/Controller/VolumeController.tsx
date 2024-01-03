import React, { ChangeEvent, useEffect, useState } from 'react'
import { Decibels } from 'tone/build/esm/core/type/Units'
import { usePolyrhythmActions } from '../../../hooks/polyrhythm-hook'
const VolumeController = () => {
  const polyrhythmActions = usePolyrhythmActions()
  const [volume, setVolume] = useState<Decibels>(-100)

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
        <input id="Volume" type="range" min={-100} max={0} value={volume} onChange={handleVolume} />
      </section>
    </div>
  )
}
export default VolumeController
