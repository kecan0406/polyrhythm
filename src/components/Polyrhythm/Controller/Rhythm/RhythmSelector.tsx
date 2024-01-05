import React from 'react'
import { usePolyrhythmValue } from '../../../../hooks/polyrhythm-hook'
import { Rhythm } from '../../../../lib/polyrhythm'
const RhythmSelector = ({ onClick }: { onClick: (rhythm: Rhythm) => void }) => {
  const polyrhythm = usePolyrhythmValue()

  const handleSelectRhythm = (id: number) => {
    const targetRhythm = polyrhythm.find((rhythm) => rhythm.id === id)
    if (targetRhythm) {
      onClick(targetRhythm)
    }
  }

  return <RhythmSelectorUI polyrhythm={polyrhythm} onClick={handleSelectRhythm} />
}
export default RhythmSelector

type RhythmSelectorUIProps = { polyrhythm: Rhythm[]; onClick: (id: number) => void }
const RhythmSelectorUI = ({ polyrhythm, onClick }: RhythmSelectorUIProps) => {
  return (
    <div className="RhythmSelector">
      <section>
        {polyrhythm.map(({ id }) => (
          <button onClick={() => onClick(id)} key={id}>
            ID : {id}
          </button>
        ))}
      </section>
    </div>
  )
}
