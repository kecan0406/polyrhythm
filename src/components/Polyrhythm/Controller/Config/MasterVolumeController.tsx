import React, { ChangeEvent, useEffect, useState } from 'react'
import { getDestination } from 'tone'
import { Decibels } from 'tone/build/esm/core/type/Units'
const MasterVolumeController = () => {
  const [masterVolume, setMasterVolume] = useState<Decibels>(-100)

  const handleMasterVolume = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setMasterVolume(target.valueAsNumber)
  }

  useEffect(() => {
    getDestination().volume.value = masterVolume
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
