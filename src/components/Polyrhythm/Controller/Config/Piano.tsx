import styled from '@emotion/styled'
import React from 'react'

const KeyboardContainer = styled.div`
  position: relative;
  height: 80px;
  display: flex;
  justify-content: center;
`

type NoteProps = { pianoKey?: 'white' | 'black' }
const Notes = styled.div<NoteProps>`
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 70%;
  height: ${({ pianoKey }) => (pianoKey === 'white' ? '100%' : '55%')};
`
const WhiteNote = styled.div<NoteProps>`
  order: 0;
  flex-grow: 1;
  display: block;
  width: 100%;
  height: 100%;
  border: 2px solid white;
  border-radius: 2px;
  box-sizing: border-box;
  background-color: #aaa;
`
type BlackNoteProps = { hasNote?: boolean }
const BlackNote = styled.div<BlackNoteProps>`
  order: 0;
  display: block;
  width: 100%;
  height: 100%;
  border: 2px solid white;
  outline: none;
  border-radius: 2px;
  box-sizing: border-box;
  background-color: black;
  flex-grow: 1;
`

const Piano = () => {
  return (
    <KeyboardContainer>
      <Notes pianoKey="white">
        <WhiteNote />
        <WhiteNote />
        <WhiteNote />
        <WhiteNote />
        <WhiteNote />
        <WhiteNote />
        <WhiteNote />
      </Notes>
      <Notes pianoKey="black">
        <BlackNote />
        <BlackNote />
        <BlackNote />
        <BlackNote />
        <BlackNote />
        <BlackNote />
      </Notes>
    </KeyboardContainer>
  )
}
export default Piano
