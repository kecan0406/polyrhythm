import { usePolyrhythmConfig } from '@/hooks/polyrhythm-config-hook'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useRef, useState } from 'react'
import { Note } from 'tone/build/esm/core/type/NoteUnits'

const WHITE_NOTES: Note[] = ['C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5']
const BLACK_NOTES: Note[] = ['B#5', 'C#5', 'D#5', 'E#5', 'F#5', 'G#5', 'A#5']

const KeyboardContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: 80px;
`
type PianoNoteProps = { none?: boolean; isActive: boolean; index: number }
const PianoNote = styled.button<PianoNoteProps>`
  opacity: ${({ none }) => (none ? 0 : 1)};
  animation: ${({ isActive, index }) => (isActive ? pianoAnimation(3 - index) : 'none')} 0.3s forwards;
`
const pianoAnimation = (range: number) => keyframes`
    from {
        background-color: #fff;
    }
    to {
        box-shadow: ${range}px -6px 0 0 #17191d inset;
    }
`

type NoteProps = { isBlack: boolean }
const PianoNotes = styled.div<NoteProps>`
  position: absolute;
  display: flex;
  width: 75%;
  flex-direction: row;
  height: ${({ isBlack }) => (isBlack ? 55 : 100)}%;
  & > ${PianoNote} {
    flex-grow: 1;
    border: 2px solid #17191d;
    border-radius: 2px;
    box-sizing: border-box;
    margin: ${({ isBlack }) => isBlack && '0 4px 2px 0'};
    transform: translateX(${({ isBlack }) => isBlack && -50}%);
    background-color: ${({ isBlack }) => (isBlack ? 'black' : '#aaa')};
  }
`

const Piano = () => {
  const polyrhythmConfig = usePolyrhythmConfig()
  const [note, setNote] = useState<Note>(polyrhythmConfig.note)
  const isPressRef = useRef<boolean>(false)

  useEffect(() => {
    polyrhythmConfig.note = note
  }, [note])

  const handleNote = ({ currentTarget }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    isPressRef.current && setNote(currentTarget.value as Note)
  }

  const handlePressNote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    isPressRef.current = true
    handleNote(e)
  }

  return (
    <KeyboardContainer>
      <PianoNotes isBlack={false}>
        {WHITE_NOTES.map((pianoNote, index) => (
          <PianoNote
            value={pianoNote}
            key={pianoNote}
            index={index}
            isActive={pianoNote === note}
            onMouseDown={handlePressNote}
            onMouseUp={() => (isPressRef.current = false)}
            onMouseMove={handleNote}
          />
        ))}
      </PianoNotes>
      <PianoNotes isBlack={true}>
        {BLACK_NOTES.map((pianoNote, index) => {
          const isNone = index === 0 || index === 3
          return (
            <PianoNote
              value={pianoNote}
              key={pianoNote}
              none={isNone}
              index={index}
              isActive={pianoNote === note}
              onMouseDown={handlePressNote}
              onMouseUp={() => (isPressRef.current = false)}
              onMouseMove={isNone ? () => {} : handleNote}
            />
          )
        })}
      </PianoNotes>
    </KeyboardContainer>
  )
}
export default Piano
