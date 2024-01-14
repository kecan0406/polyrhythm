import React, { ChangeEvent, useEffect, useState } from 'react'
import { NOTES } from '../../../../constants/note'
import { Rhythm } from '../../../../lib/polyrhythm'

type RhythmNoteControllerProps = { rhythm: Rhythm }
const RhythmNoteController = ({ rhythm }: RhythmNoteControllerProps) => {
  const [index, setIndex] = useState<number>(() => NOTES.findIndex((note) => note === rhythm.note))

  useEffect(() => {
    setIndex(NOTES.findIndex((note) => note === rhythm.note))
  }, [rhythm])

  const handleNote = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const index = target.valueAsNumber
    setIndex(index)
    rhythm.note = NOTES[index]
  }

  return <RhythmNoteControllerUI onChange={handleNote} index={index} />
}
export default RhythmNoteController

type RhythmNoteControllerUIProps = {
  index: number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
const RhythmNoteControllerUI = ({ index, onChange }: RhythmNoteControllerUIProps) => {
  return (
    <div className="NoteController">
      <section>
        <label htmlFor="note">Note : {NOTES[index]}</label>
        <input type="range" id="note" min={0} max={NOTES.length - 1} onChange={onChange} value={index} />
      </section>
    </div>
  )
}
