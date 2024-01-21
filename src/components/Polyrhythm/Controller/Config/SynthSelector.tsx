import { SynthName } from '@/lib/instruments'
import { rhythmConfigState } from '@/recoil/config/atom'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

const SynthSelectorContainer = styled.div``
const SynthSelectorLabel = styled.label``
const SynthSelect = styled.select``
const SynthOption = styled.option``

const synths: SynthName[] = ['beep', 'membrane', 'amsine']
const SynthSelector = () => {
  const [rhythmConfig, setRhythmConfig] = useRecoilState(rhythmConfigState)
  const [synthName, setSynthName] = useState<SynthName>(rhythmConfig.synthName)

  useEffect(() => {
    setRhythmConfig((currVal) => ({ ...currVal, synthName }))
  }, [synthName])

  const handleSynth = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setSynthName(target.value as SynthName)
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
