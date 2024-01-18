import { usePolyrhythmConfig } from '@/hooks/polyrhythm-config-hook'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { Note } from 'tone/build/esm/core/type/NoteUnits'

const KeyboardContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: 80px;
`

type NoteProps = { pianoKey?: 'white' | 'black' }
const Notes = styled.div<NoteProps>`
  position: absolute;
  display: flex;
  width: 75%;
  flex-direction: row;
  height: ${({ pianoKey }) => (pianoKey === 'white' ? '100%' : '55%')};
`
const WhiteNote = styled.button<NoteProps>`
  flex-grow: 1;
  border: 2px solid #17191d;
  border-radius: 2px;
  box-sizing: border-box;
  background-color: #aaa;
`
type BlackNoteProps = { none?: boolean }
const BlackNote = styled.button<BlackNoteProps>`
  flex-grow: 1;
  opacity: ${({ none }) => (none ? 0 : 1)};
  margin: 0 4px 2px 0;
  transform: translateX(-50%);
  border: 2px solid #17191d;
  border-radius: 2px;
  box-sizing: border-box;
  background-color: black;
`

const Piano = () => {
  const polyrhythmConfig = usePolyrhythmConfig()
  const [note, setNote] = useState<Note>(polyrhythmConfig.note)

  const handlePlayNote = (note: Note) => {
    setNote(note)
  }

  useEffect(() => {
    polyrhythmConfig.note = note
  }, [note])

  return (
    <KeyboardContainer>
      <Notes pianoKey="white">
        <WhiteNote onClick={() => handlePlayNote('C5')} />
        <WhiteNote onClick={() => handlePlayNote('D5')} />
        <WhiteNote onClick={() => handlePlayNote('E5')} />
        <WhiteNote onClick={() => handlePlayNote('F5')} />
        <WhiteNote onClick={() => handlePlayNote('G5')} />
        <WhiteNote onClick={() => handlePlayNote('A5')} />
        <WhiteNote onClick={() => handlePlayNote('B5')} />
      </Notes>
      <Notes pianoKey="black">
        <BlackNote none />
        <BlackNote onClick={() => handlePlayNote('C#5')} />
        <BlackNote onClick={() => handlePlayNote('D#5')} />
        <BlackNote none />
        <BlackNote onClick={() => handlePlayNote('F#5')} />
        <BlackNote onClick={() => handlePlayNote('G#5')} />
        <BlackNote onClick={() => handlePlayNote('A#5')} />
      </Notes>
    </KeyboardContainer>
  )
}
export default Piano
