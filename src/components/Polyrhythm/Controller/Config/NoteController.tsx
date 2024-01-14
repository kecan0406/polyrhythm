import React, { ChangeEvent, useEffect, useState } from 'react'
import { NOTES } from '../../../../constants/note'
import { usePolyrhythmConfig } from '../../../../hooks/polyrhythm-config-hook'

const NoteController = () => {
  const polyrhythmConfig = usePolyrhythmConfig()
  const [index, setIndex] = useState<number>(() => {
    return NOTES.findIndex((note) => note === polyrhythmConfig.note)
  })

  const handleNote = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setIndex(target.valueAsNumber)
  }

  useEffect(() => {
    polyrhythmConfig.note = NOTES[index]
  }, [index])

  return <NoteControllerUI onChange={handleNote} index={index} />
}
export default NoteController

type NoteControllerUIProps = { index: number; onChange: (e: ChangeEvent<HTMLInputElement>) => void }
const NoteControllerUI = ({ index, onChange }: NoteControllerUIProps) => {
  return (
    <div className="NoteController">
      <section>
        <label htmlFor="note">Note : {NOTES[index]}</label>
        <input type="range" id="note" min={0} max={NOTES.length - 1} onChange={onChange} value={index} />
      </section>
    </div>
  )
}
