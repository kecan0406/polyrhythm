import React, { ChangeEvent, useEffect, useState } from 'react'
import { Decibels } from 'tone/build/esm/core/type/Units'
import { usePolyrhythmActions } from '../../../hooks/polyrhythm-hook'
const VolumeController = () => {
  const polyrhythmActions = usePolyrhythmActions()
  const [masterVolume, setMasterVolume] = useState<Decibels>(-100)

  const handleMasterVolume = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setMasterVolume(target.valueAsNumber)
  }

  useEffect(() => {
    polyrhythmActions.setMasterVolume(masterVolume)
  }, [masterVolume])

  return (
    <div className="VolumeController">
      <section>
        <label htmlFor="MasterVolume">Master Volume : {masterVolume}</label>
        <input id="MasterVolume" type="range" min={-100} max={0} value={masterVolume} onChange={handleMasterVolume} />
      </section>
    </div>
  )
}
export default VolumeController
