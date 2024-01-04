import React from 'react'
import { Rhythm } from '../../../../lib/polyrhythm'
const RhythmSelector = ({ onClick, polyrhythm }: { onClick: (id: number) => void; polyrhythm: Rhythm[] }) => {
  const handleSelectRhythm = (id: number) => {
    onClick(id)
  }

  return (
    <div className="RhythmSelector">
      <section>
        {polyrhythm.map(({ id }) => (
          <button onClick={() => handleSelectRhythm(id)} key={id}>
            ID : {id}
          </button>
        ))}
      </section>
    </div>
  )
}
export default RhythmSelector
