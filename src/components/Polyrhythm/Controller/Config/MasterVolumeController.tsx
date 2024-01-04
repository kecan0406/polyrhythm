import React, { ChangeEvent, useEffect, useState } from 'react'
import { Decibels } from 'tone/build/esm/core/type/Units'
import { usePolyrhythmActions } from '../../../../hooks/polyrhythm-hook'
const MasterVolumeController = () => {
  const [masterVolume, setMasterVolume] = useState<Decibels>(-100)
  const polyrhythmActions = usePolyrhythmActions()

  const handleMasterVolume = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setMasterVolume(target.valueAsNumber)
  }

  useEffect(() => {
    polyrhythmActions.setMasterVolume(masterVolume)
  }, [masterVolume])

  return <MasterVolumeControllerUI masterVolume={masterVolume} onChange={handleMasterVolume} />
}
export default MasterVolumeController

type MasterVolumeControllerUIProps = { masterVolume: number; onChange: (e: ChangeEvent<HTMLInputElement>) => void }
const MasterVolumeControllerUI = ({ masterVolume, onChange }: MasterVolumeControllerUIProps) => {
  return (
    <div className="MasterVolumeController">
      <section>
        <label htmlFor="MasterVolume">Master Volume : {masterVolume}</label>
        <input id="MasterVolume" type="range" min={-100} max={0} value={masterVolume} onChange={onChange} />
      </section>
    </div>
  )
}
