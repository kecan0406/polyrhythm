import React, { useState } from 'react'
import { Rhythm } from '../../../../lib/polyrhythm'
import RhythmSelector from './RhythmSelector'
import RhythmVolumeController from './RhythmVolumeController'

const RhythmController = () => {
  const [rhythm, setRhythm] = useState<Rhythm | null>(null)

  const handleSelectRhythm = (rhythm: Rhythm | null) => {
    setRhythm(rhythm)
  }

  return (
    <div className="RhythmController">
      <RhythmSelector onClick={handleSelectRhythm} />
      {rhythm && <RhythmVolumeController rhythm={rhythm} />}
    </div>
  )
}
export default RhythmController
