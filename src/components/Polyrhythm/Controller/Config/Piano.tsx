import styled from '@emotion/styled'
import React from 'react'

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
const WhiteNote = styled.div<NoteProps>`
  flex-grow: 1;
  border: 2px solid #17191d;
  border-radius: 2px;
  box-sizing: border-box;
  background-color: #aaa;
`
type BlackNoteProps = { none?: boolean }
const BlackNote = styled.div<BlackNoteProps>`
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
        <BlackNote none />
        <BlackNote />
        <BlackNote />
        <BlackNote none />
        <BlackNote />
        <BlackNote />
        <BlackNote />
      </Notes>
    </KeyboardContainer>
  )
}
export default Piano
