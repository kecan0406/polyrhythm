import Keyboard from '@/components/Drawer/Keyboard'
import PitchSlider from '@/components/Drawer/PitchSlider'
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
  flex-direction: row;
`

const KeyboardPart = styled.div`
  width: 90%;
`
const TunePart = styled.div`
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
        <SynthSelector />
        <Keyboard onPlay={handlePlayKeyboard} />
      </KeyboardPart>
      <TunePart>
        <PitchSlider />
      </TunePart>
    </AudioInterfaceContainer>
  )
}
export default AudioInterface
