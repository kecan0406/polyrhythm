import { rhythmConfigState } from '@/recoil/config/atom'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Note } from 'tone/build/esm/core/type/NoteUnits'

const WHITE_NOTES: Note[] = ['C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5']
const BLACK_NOTES: Note[] = ['B#5', 'C#5', 'D#5', 'E#5', 'F#5', 'G#5', 'A#5']

const KeyboardContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: 80px;
`
type KeyboardNoteProps = { none?: boolean; isActive: boolean; index: number }
const KeyboardNote = styled.button<KeyboardNoteProps>`
  opacity: ${({ none }) => (none ? 0 : 1)};
  animation: ${({ isActive, index }) => (isActive ? keyboardAnimation(3 - index) : 'none')} 0.2s forwards;
`
const keyboardAnimation = (range: number) => keyframes`
    from {
        background-color: #fff;
    }
    to {
        box-shadow: ${range}px -4px 0 0 #17191d inset;
    }
`

type NoteProps = { isBlack: boolean }
const KeyboardNoteContainer = styled.div<NoteProps>`
  position: absolute;
  display: flex;
  width: 75%;
  flex-direction: row;
  height: ${({ isBlack }) => (isBlack ? 55 : 100)}%;
  & > ${KeyboardNote} {
    flex-grow: 1;
    border: 2px solid #17191d;
    border-radius: 2px;
    box-sizing: border-box;
    margin: ${({ isBlack }) => isBlack && '0 4px 2px 0'};
    transform: translateX(${({ isBlack }) => isBlack && -50}%);
    background-color: ${({ isBlack }) => (isBlack ? 'black' : '#aaa')};
  }
`

const Keyboard = () => {
  const [rhythmConfig, setRhythmConfig] = useRecoilState(rhythmConfigState)
  const [note, setNote] = useState<Note>(rhythmConfig.note)
  const isPressRef = useRef<boolean>(false)

  useEffect(() => {
    setRhythmConfig((currVal) => ({ ...currVal, note }))
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
      <KeyboardNoteContainer isBlack={false}>
        {WHITE_NOTES.map((kbdNote, index) => (
          <KeyboardNote
            value={kbdNote}
            key={kbdNote}
            index={index}
            isActive={kbdNote === note}
            onMouseDown={handlePressNote}
            onMouseUp={() => (isPressRef.current = false)}
            onMouseMove={handleNote}
          />
        ))}
      </KeyboardNoteContainer>
      <KeyboardNoteContainer isBlack={true}>
        {BLACK_NOTES.map((kbdNote, index) => {
          const isNone = index === 0 || index === 3
          return (
            <KeyboardNote
              value={kbdNote}
              key={kbdNote}
              none={isNone}
              index={index}
              isActive={kbdNote === note}
              onMouseDown={handlePressNote}
              onMouseUp={() => (isPressRef.current = false)}
              onMouseMove={isNone ? () => {} : handleNote}
            />
          )
        })}
      </KeyboardNoteContainer>
    </KeyboardContainer>
  )
}
export default Keyboard
