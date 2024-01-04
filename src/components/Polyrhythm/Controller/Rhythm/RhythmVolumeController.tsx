import React, { ChangeEvent, useEffect, useState } from 'react'
import { Decibels } from 'tone/build/esm/core/type/Units'
import { Rhythm } from '../../../../lib/polyrhythm'

const RhythmVolumeController = ({ rhythm }: { rhythm: Rhythm }) => {
  const [volume, setVolume] = useState<Decibels>(0)

  useEffect(() => {
    setVolume(rhythm.getVolume())
  }, [rhythm])

  useEffect(() => {
    rhythm.setVolume(volume)
  }, [volume])

  const handleVolume = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setVolume(target.valueAsNumber)
  }

  return (
    <div className="VolumeController">
      <section>
        <label htmlFor="Volume">Volume : {volume}</label>
        <input id="Volume" type="range" min={-100} max={0} value={volume} onChange={handleVolume} />
      </section>
    </div>
  )
}
export default RhythmVolumeController
