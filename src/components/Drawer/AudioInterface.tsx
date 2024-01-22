import Keyboard from '@/components/Drawer/Keyboard'
import PitchController from '@/components/Drawer/PitchController'
import SynthController from '@/components/Drawer/SynthController'
import { Instruments } from '@/lib/instruments'
import { NoteSymbol } from '@/recoil/config/atom'
import { rhythmConfigPitchState, rhythmConfigSynthNameState } from '@/recoil/config/selector'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { getDestination } from 'tone'

const AudioInterfaceContainer = styled.div`
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
`

const KeyboardPart = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
`
const KeyboardSynth = styled.div`
  width: 75%;
`
const KeyboardPitch = styled.div`
  width: 10%;
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
      <KeyboardPart>
        <KeyboardSynth>
          <SynthController />
          <Keyboard onPlay={handlePlayKeyboard} />
        </KeyboardSynth>
        <KeyboardPitch>
          <PitchController />
        </KeyboardPitch>
      </KeyboardPart>
    </AudioInterfaceContainer>
  )
}
export default AudioInterface
