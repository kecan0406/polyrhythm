import { usePolyrhythmConfig } from '@/hooks/polyrhythm-config-hook'
import { SynthName } from '@/lib/instruments'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'

const SynthControllerContainer = styled.div``
const SynthLabel = styled.label``
const SynthSelect = styled.select``
const SynthOption = styled.option``

const synths: SynthName[] = ['beep', 'membrane', 'amsine']
const SynthController = () => {
  const polyrhythmConfig = usePolyrhythmConfig()
  const [synthName, setSynthName] = useState<SynthName>(polyrhythmConfig.synthName)

  useEffect(() => {
    polyrhythmConfig.synthName = synthName
  }, [synthName])

  const handleSynth = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setSynthName(target.value as SynthName)
  }

  return (
    <SynthControllerContainer>
      <SynthLabel>
        Synth:
        <SynthSelect onChange={handleSynth}>
          {synths.map((synth) => (
            <SynthOption key={synth} value={synth}>
              {synth}
            </SynthOption>
          ))}
        </SynthSelect>
      </SynthLabel>
    </SynthControllerContainer>
  )
}
export default SynthController
