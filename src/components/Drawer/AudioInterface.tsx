import Keyboard from '@/components/Drawer/Keyboard'
import PitchController from '@/components/Drawer/PitchController'
import SynthSelector from '@/components/Drawer/SynthSelector'
import { Instruments } from '@/lib/instruments'
import { NoteSymbol } from '@/recoil/config/atom'
import { rhythmConfigPitchState, rhythmConfigSynthNameState } from '@/recoil/config/selector'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { getDestination } from 'tone'

const AudioInterfaceContainer = styled.div`
  margin-bottom: 4rem;
  color: rgb(209, 210, 211);
  display: flex;
  flex-direction: column;
`

const KeyboardPart = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const AudioInterface = () => {
  const rhythmConfigSynthName = useRecoilValue(rhythmConfigSynthNameState)
  const rhythmConfigPitch = useRecoilValue(rhythmConfigPitchState)
  const [instrument, setInstrument] = useState<Instruments>(() =>
    new Instruments(rhythmConfigSynthName).connect(getDestination()),
  )

  useEffect(() => {
    setInstrument((prevInst) => {
      prevInst.dispose()
      return new Instruments(rhythmConfigSynthName).connect(getDestination())
    })
  }, [rhythmConfigSynthName])

  const handlePlayKeyboard = (noteSymbol: NoteSymbol) => {
    instrument.trigger(noteSymbol, rhythmConfigPitch, '8n')
  }

  return (
    <AudioInterfaceContainer>
      <SynthSelector />
      <KeyboardPart>
        <Keyboard onPlay={handlePlayKeyboard} />
        <PitchController />
      </KeyboardPart>
    </AudioInterfaceContainer>
  )
}
export default AudioInterface
