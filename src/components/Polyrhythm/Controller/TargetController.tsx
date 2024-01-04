import React, { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from 'react'
import { Decibels } from 'tone/build/esm/core/type/Units'
import { usePolyrhythmValue } from '../../../hooks/polyrhythm-hook'
import { Rhythm } from '../../../lib/polyrhythm'
import RhythmList from './RhythmList'

const TargetController = () => {
  const rhythmRef: MutableRefObject<Rhythm | null> = useRef<Rhythm>(null)
  const polyrhythm = usePolyrhythmValue()

  const [selectedId, setSelectedId] = useState<number>(0)
  const [volume, setVolume] = useState<Decibels>(0)

  const handleChangeId = (id: number) => {
    setSelectedId(id)
  }

  const handleVolume = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setVolume(target.valueAsNumber)
  }

  useEffect(() => {
    const rhythm = polyrhythm.find((rhythm) => rhythm.id === selectedId)
    if (rhythm) {
      rhythmRef.current = rhythm
    }
  }, [polyrhythm, selectedId])

  useEffect(() => {
    const rhythm = rhythmRef.current
    if (rhythm) {
      rhythm.setVolume(volume)
    }
  }, [volume])

  return (
    <div className="TargetController">
      <RhythmList onChange={handleChangeId} polyrhythm={polyrhythm} />
      <section>
        <label htmlFor="Volume">
          ID {selectedId} Volume : {volume}
        </label>
        <input id="Volume" type="range" min={-100} max={0} value={volume} onChange={handleVolume} />
      </section>
    </div>
  )
}
export default TargetController
