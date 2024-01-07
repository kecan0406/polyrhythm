import React, { ChangeEvent, useEffect, useState } from 'react'
import { Note } from 'tone/build/esm/core/type/NoteUnits'
import { Rhythm } from '../../../../lib/polyrhythm'

const notes: Note[] = ['C5', 'E5', 'G5', 'C6']
type RhythmNoteControllerProps = { rhythm: Rhythm }
const RhythmNoteController = ({ rhythm }: RhythmNoteControllerProps) => {
  const [index, setIndex] = useState<number>(() => notes.findIndex((note) => note === rhythm.note))

  useEffect(() => {
    setIndex(notes.findIndex((note) => note === rhythm.note))
  }, [rhythm])

  const handleNote = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const index = target.valueAsNumber
    setIndex(index)
    rhythm.note = notes[index]
  }

  return <RhythmNoteControllerUI notes={notes} onChange={handleNote} index={index} />
}
export default RhythmNoteController

type RhythmNoteControllerUIProps = {
  index: number
  notes: Note[]
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
const RhythmNoteControllerUI = ({ index, notes, onChange }: RhythmNoteControllerUIProps) => {
  return (
    <div className="NoteController">
      <section>
        <label htmlFor="note">Note : {notes[index]}</label>
        <input type="range" id="note" min={0} max={notes.length - 1} onChange={onChange} value={index} />
      </section>
    </div>
  )
}
