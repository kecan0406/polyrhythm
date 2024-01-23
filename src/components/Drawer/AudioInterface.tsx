import Keyboard from '@/components/Drawer/Keyboard'
import PitchController from '@/components/Drawer/PitchController'
import SynthController from '@/components/Drawer/SynthController'
import { Instruments } from '@/lib/instruments'
import { NoteSymbol } from '@/recoil/rhythm/atom'
import withPitch from '@/recoil/rhythm/withPitch'
import withSynthName from '@/recoil/rhythm/withSynthName'
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
  const rhythmSynthName = useRecoilValue(withSynthName)
  const rhythmPitch = useRecoilValue(withPitch)

  const [instrument, setInstrument] = useState<Instruments>(() =>
    new Instruments(rhythmSynthName).connect(getDestination()),
  )

  useEffect(() => {
    setInstrument((prevInst) => {
      prevInst.dispose()
      return new Instruments(rhythmSynthName).connect(getDestination())
    })
  }, [rhythmSynthName])

  const handlePlayKeyboard = (noteSymbol: NoteSymbol) => {
    instrument.trigger(noteSymbol, rhythmPitch, '8n')
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
