import { rhythmWithNoteSymbol } from '@/recoil/rhythm'
import { NoteSymbol } from '@/types/rhythm-types'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'

const WHITE_NOTES: NoteSymbol[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
const BLACK_NOTES: NoteSymbol[] = ['B#', 'C#', 'D#', 'E#', 'F#', 'G#', 'A#']

const KeyboardContainer = styled.div`
  position: relative;
  display: flex;
  height: 100px;
  justify-content: center;
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

type NoteProps = { isBlack?: boolean }
const KeyboardNoteContainer = styled.div<NoteProps>`
  position: absolute;
  display: flex;
  width: 100%;
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

type KeyboardProps = { onPlay: (note: NoteSymbol) => void }
const Keyboard = ({ onPlay }: KeyboardProps) => {
  const [rhythmNoteSymbol, setRhythmNoteSymbol] = useRecoilState(rhythmWithNoteSymbol)
  const [press, setPress] = useState<boolean>(false)

  const handleNote = (noteSymbol: NoteSymbol, press: boolean, none?: boolean) => () => {
    setPress(press)
    if (!press || noteSymbol === rhythmNoteSymbol || none) return

    setRhythmNoteSymbol(noteSymbol)
    onPlay(noteSymbol)
  }

  return (
    <KeyboardContainer>
      <KeyboardNoteContainer>
        {WHITE_NOTES.map((noteSymbol, index) => (
          <KeyboardNote
            key={noteSymbol}
            index={index}
            isActive={rhythmNoteSymbol === noteSymbol}
            onMouseDown={handleNote(noteSymbol, true)}
            onMouseUp={handleNote(noteSymbol, false)}
            onMouseMove={handleNote(noteSymbol, press)}
          />
        ))}
      </KeyboardNoteContainer>
      <KeyboardNoteContainer isBlack>
        {BLACK_NOTES.map((noteSymbol, index) => {
          const none = index === 0 || index === 3
          return (
            <KeyboardNote
              key={noteSymbol}
              none={none}
              index={index}
              isActive={rhythmNoteSymbol === noteSymbol}
              onMouseDown={handleNote(noteSymbol, true, none)}
              onMouseUp={handleNote(noteSymbol, false)}
              onMouseMove={handleNote(noteSymbol, press, none)}
            />
          )
        })}
      </KeyboardNoteContainer>
    </KeyboardContainer>
  )
}
export default Keyboard
