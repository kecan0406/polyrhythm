import React, { ChangeEvent } from 'react'
import { usePolyrhythmValue } from '../../../hooks/polyrhythm-hook'
const RhythmList = () => {
  const polyrhythm = usePolyrhythmValue()

  const handleSelectRhythm = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    console.log(target.value)
  }

  return (
    <div className="RhythmList">
      <section>
        <select onChange={handleSelectRhythm}>
          {polyrhythm.map(({ id }) => (
            <option label={`ID : ${id}`} value={id} key={id} />
          ))}
        </select>
      </section>
    </div>
  )
}
export default RhythmList
