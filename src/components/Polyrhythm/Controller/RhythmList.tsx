import React, { ChangeEvent } from 'react'
import { Rhythm } from '../../../lib/polyrhythm'
const RhythmList = ({ onChange, polyrhythm }: { onChange: (id: number) => void; polyrhythm: Rhythm[] }) => {
  const handleSelectRhythm = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(target.value))
  }

  return (
    <section>
      <select onChange={handleSelectRhythm}>
        {polyrhythm.map(({ id }) => (
          <option label={`ID : ${id}`} value={id} key={id} />
        ))}
      </select>
    </section>
  )
}
export default RhythmList
