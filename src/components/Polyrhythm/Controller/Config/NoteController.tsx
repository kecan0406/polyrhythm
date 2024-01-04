import React, { ChangeEvent, useEffect, useState } from 'react'
import { Note } from 'tone/build/esm/core/type/NoteUnits'
import { usePolyrhythmActions } from '../../../../hooks/polyrhythm-hook'

const notes: Note[] = ['C5', 'E5', 'G5', 'C6']
const NoteController = () => {
  const polyrhythmActions = usePolyrhythmActions()
  const [index, setIndex] = useState<number>(0)

  const handleNote = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setIndex(target.valueAsNumber)
  }

  useEffect(() => {
    polyrhythmActions.setNote(notes[index])
  }, [index])

  return <NoteControllerUI notes={notes} onChange={handleNote} index={index} />
}
export default NoteController

type NoteControllerUIProps = { index: number; notes: Note[]; onChange: (e: ChangeEvent<HTMLInputElement>) => void }
const NoteControllerUI = ({ index, notes, onChange }: NoteControllerUIProps) => {
  return (
    <div className="NoteController">
      <section>
        <label htmlFor="note">Note : {notes[index]}</label>
        <input type="range" id="note" min={0} max={notes.length - 1} onChange={onChange} value={index} />
      </section>
    </div>
  )
}
