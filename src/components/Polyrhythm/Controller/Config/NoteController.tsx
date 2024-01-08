import React, { ChangeEvent, useEffect, useState } from 'react'
import { Note } from 'tone/build/esm/core/type/NoteUnits'
import { usePolyrhythmConfig } from '../../../../hooks/polyrhythm-config-hook'

const notes: Note[] = ['C5', 'E5', 'G5', 'C6']
const NoteController = () => {
  const polyrhythmConfig = usePolyrhythmConfig()
  const [index, setIndex] = useState<number>(() => {
    return notes.findIndex((note) => note === polyrhythmConfig.note)
  })

  const handleNote = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setIndex(target.valueAsNumber)
  }

  useEffect(() => {
    polyrhythmConfig.note = notes[index]
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
