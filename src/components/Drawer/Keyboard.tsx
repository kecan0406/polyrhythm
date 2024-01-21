import { rhythmConfigState } from '@/recoil/config/atom'
import { rhythmConfigNoteState } from '@/recoil/config/selector'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useRef } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
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

type KeyboardProps = { onPlay: (note: Note) => void }
const Keyboard = ({ onPlay }: KeyboardProps) => {
  const rhythmConfigNote = useRecoilValue(rhythmConfigNoteState)
  const setRhythmConfig = useSetRecoilState(rhythmConfigState)
  const isPressRef = useRef<boolean>(false)

  const handleNote = ({ currentTarget: { value: note } }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!isPressRef.current || note === rhythmConfigNote) return

    setRhythmConfig((currVal) => ({ ...currVal, note: note as Note }))
    onPlay(note as Note)
  }

  const handlePressNote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    isPressRef.current = true
    handleNote(e)
  }

  return (
    <KeyboardContainer>
      <KeyboardNoteContainer isBlack={false}>
        {WHITE_NOTES.map((note, index) => (
          <KeyboardNote
            value={note}
            key={note}
            index={index}
            isActive={note === rhythmConfigNote}
            onMouseDown={handlePressNote}
            onMouseUp={() => (isPressRef.current = false)}
            onMouseMove={handleNote}
          />
        ))}
      </KeyboardNoteContainer>
      <KeyboardNoteContainer isBlack={true}>
        {BLACK_NOTES.map((note, index) => {
          const isNone = index === 0 || index === 3
          return (
            <KeyboardNote
              value={note}
              key={note}
              none={isNone}
              index={index}
              isActive={note === rhythmConfigNote}
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
