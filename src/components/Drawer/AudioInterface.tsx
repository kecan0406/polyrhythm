import Keyboard from '@/components/Drawer/Keyboard'
import PitchController from '@/components/Drawer/PitchController'
import SynthController from '@/components/Drawer/SynthController'
import { useRhythmValue } from '@/hooks/useRhythmValue'
import { Instruments } from '@/lib/instruments'
import { NoteSymbol } from '@/types/rhythm-types'
import styled from '@emotion/styled'
import React, { useEffect, useMemo } from 'react'
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
  const { synthName, pitch } = useRhythmValue()

  const instrument = useMemo(() => new Instruments(synthName).connect(getDestination()), [])

  useEffect(() => {
    instrument.changeSynth(synthName)
  }, [synthName])

  const handlePlayKeyboard = (noteSymbol: NoteSymbol) => {
    instrument.trigger(noteSymbol, pitch, '8n')
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
