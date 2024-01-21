import Keyboard from '@/components/Polyrhythm/Controller/Config/Keyboard'
import SynthSelector from '@/components/Polyrhythm/Controller/Config/SynthSelector'
import styled from '@emotion/styled'
import React from 'react'

const AudioInterfaceContainer = styled.div`
  margin-bottom: 4rem;
  color: rgb(209, 210, 211);
`

const AudioInterface = () => {
  return (
    <AudioInterfaceContainer>
      <SynthSelector />
      <Keyboard />
    </AudioInterfaceContainer>
  )
}
export default AudioInterface
