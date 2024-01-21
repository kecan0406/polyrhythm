import { SynthName } from '@/lib/instruments'
import { rhythmConfigState } from '@/recoil/config/atom'
import styled from '@emotion/styled'
import React from 'react'
import { useSetRecoilState } from 'recoil'

const SynthSelectorContainer = styled.div``
const SynthSelectorLabel = styled.label``
const SynthSelect = styled.select``
const SynthOption = styled.option``

const synths: SynthName[] = ['beep', 'membrane', 'amsine']
const SynthSelector = () => {
  const setRhythmConfig = useSetRecoilState(rhythmConfigState)

  const handleSynth = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const synthName = target.value as SynthName
    setRhythmConfig((currVal) => ({ ...currVal, synthName }))
  }

  return (
    <SynthSelectorContainer>
      <SynthSelectorLabel>
        Synth:
        <SynthSelect onChange={handleSynth}>
          {synths.map((synth) => (
            <SynthOption key={synth} value={synth}>
              {synth}
            </SynthOption>
          ))}
        </SynthSelect>
      </SynthSelectorLabel>
    </SynthSelectorContainer>
  )
}
export default SynthSelector
