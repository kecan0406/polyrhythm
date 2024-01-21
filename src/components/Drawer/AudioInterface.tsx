import Keyboard from '@/components/Drawer/Keyboard'
import SynthSelector from '@/components/Drawer/SynthSelector'
import { SYNTH } from '@/lib/instruments'
import { rhythmConfigSynthNameState } from '@/recoil/config/selector'
import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { Note } from 'tone/build/esm/core/type/NoteUnits'

const AudioInterfaceContainer = styled.div`
  margin-bottom: 4rem;
  color: rgb(209, 210, 211);
`

const AudioInterface = () => {
  const rhythmConfigSynthName = useRecoilValue(rhythmConfigSynthNameState)
  const synth = useMemo(() => SYNTH[rhythmConfigSynthName]().toDestination(), [rhythmConfigSynthName])

  const handlePlayKeyboard = (note: Note) => {
    synth.triggerAttackRelease(note, '8n')
  }

  return (
    <AudioInterfaceContainer>
      <SynthSelector />
      <Keyboard onPlay={handlePlayKeyboard} />
    </AudioInterfaceContainer>
  )
}
export default AudioInterface
