import React, { ChangeEvent, useEffect, useState } from 'react'
import { Note } from 'tone/build/esm/core/type/NoteUnits'
import { usePolyrhythmActions } from '../../../hooks/polyrhythm-hook'

const notes: Note[] = ['C5', 'E5', 'G5', 'C6']
const NoteController = () => {
  const polyrhythmActions = usePolyrhythmActions()
  const [index, setIndex] = useState<number>(0)

  const currentNote = notes[index]

  const handleNote = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setIndex(target.valueAsNumber)
  }

  useEffect(() => {
    polyrhythmActions.setNote(currentNote)
  }, [index])

  return (
    <div className="NoteController">
      <section>
        <label htmlFor="note">Note : {currentNote}</label>
        <input type="range" id="note" min={0} max={notes.length - 1} onChange={handleNote} value={index} />
      </section>
    </div>
  )
}
export default NoteController
