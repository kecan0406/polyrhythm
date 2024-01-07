import React, { ChangeEvent, useEffect, useState } from 'react'
import { Decibels } from 'tone/build/esm/core/type/Units'
import { Rhythm } from '../../../lib/polyrhythm'

const TargetVolumeController = ({ selectedId, rhythm }: { selectedId: number; rhythm: Rhythm | null }) => {
  const [volume, setVolume] = useState<Decibels>(0)

  const handleVolume = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setVolume(target.valueAsNumber)
  }

  useEffect(() => {
    if (rhythm) {
      rhythm.setVolume(volume)
    }
  }, [volume])

  return (
    <section>
      <label htmlFor="Volume">
        ID {selectedId} Volume : {volume}
      </label>
      <input id="Volume" type="range" min={-100} max={0} value={volume} onChange={handleVolume} />
    </section>
  )
}
export default TargetVolumeController
