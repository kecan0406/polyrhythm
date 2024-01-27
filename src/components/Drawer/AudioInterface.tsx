import Keyboard from '@/components/Drawer/Keyboard'
import PitchController from '@/components/Drawer/PitchController'
import SynthController from '@/components/Drawer/SynthController'
import { useInstrument } from '@/hooks/useInstrument'
import { rhythmWithPitch, rhythmWithSynthName } from '@/recoil/rhythm'
import { NoteSymbol } from '@/types/rhythm-types'
import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

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
  const synthName = useRecoilValue(rhythmWithSynthName)
  const pitch = useRecoilValue(rhythmWithPitch)
  const instrumentRef = useInstrument(synthName)

  useEffect(() => {
    const instrument = instrumentRef.current!
    instrument.changeSynth(synthName)
  }, [synthName])

  const handlePlayKeyboard = (noteSymbol: NoteSymbol) => {
    const instrument = instrumentRef.current!
    instrument.trigger(`${noteSymbol}${pitch}`, '8n')
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
