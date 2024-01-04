import React, { useEffect, useState } from 'react'
import { usePolyrhythmValue } from '../../../../hooks/polyrhythm-hook'
import { Rhythm } from '../../../../lib/polyrhythm'
import RhythmSelector from './RhythmSelector'
import RhythmVolumeController from './RhythmVolumeController'

const RhythmController = () => {
  const [rhythm, setRhythm] = useState<Rhythm | null>(null)
  const polyrhythm = usePolyrhythmValue()

  const handleSelectRhythm = (id: number) => {
    const targetRhythm = polyrhythm.find((rhythm) => rhythm.id === id)
    if (targetRhythm) {
      setRhythm(targetRhythm)
    }
  }

  useEffect(() => {
    if (!polyrhythm.length) {
      setRhythm(null)
    }
  }, [polyrhythm])

  return (
    <div className="RhythmController">
      <RhythmSelector onClick={handleSelectRhythm} polyrhythm={polyrhythm} />
      {rhythm && <RhythmVolumeController rhythm={rhythm} />}
    </div>
  )
}
export default RhythmController
