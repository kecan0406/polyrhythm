import React, { useEffect, useState } from 'react'
import { usePolyrhythmValue } from '../../../../hooks/polyrhythm-hook'
import { Rhythm } from '../../../../lib/polyrhythm'
const RhythmSelector = ({ onClick }: { onClick: (rhythm: Rhythm | null) => void }) => {
  const polyrhythm = usePolyrhythmValue()
  const [rhythmId, setRhythmId] = useState<number>(0)

  const handleSelectRhythm = (id: number) => {
    setRhythmId(id)
  }

  useEffect(() => {
    const rhythm = polyrhythm.find(({ id }) => id === rhythmId) ?? null
    onClick(rhythm)
  }, [rhythmId, polyrhythm])

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
