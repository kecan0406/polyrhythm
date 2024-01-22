import { SynthName } from '@/lib/instruments'
import { rhythmConfigState } from '@/recoil/config/atom'
import { rhythmConfigSynthNameState } from '@/recoil/config/selector'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

const SynthControllerContainer = styled.div`
  height: 20px;
  display: flex;
`
const SynthDotButton = styled.button`
  display: flex;
  flex: 1;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  justify-content: center;
  align-items: center;
`
type SynthDotProps = { isActive: boolean }
const SynthDot = styled.div<SynthDotProps>`
  width: 10px;
  height: 10px;
  border: 0 solid #fff;
  background-color: #aaa;
  border-radius: 9999px;
  animation: ${({ isActive }) => pitchDotAnimation(isActive)} 0.1s ease-out forwards;
`
const pitchDotAnimation = (isActive: boolean) => keyframes`
    from {
        background-color: ${!isActive ? '#fff' : '#aaa'};
        border-width: ${!isActive ? '3px' : '0'};
    }
    to {
        background-color: ${isActive ? '#fff' : '#aaa'};
        border-width: ${isActive ? '3px' : '0'};
    }
`

const SYNTH_DOTS: SynthName[] = ['beep', 'membrane', 'amsine']
const SynthController = () => {
  const rhythmConfigSynthName = useRecoilValue(rhythmConfigSynthNameState)
  const setRhythmConfig = useSetRecoilState(rhythmConfigState)

  const handleSynth = ({ currentTarget: { value } }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setRhythmConfig((currVal) => ({ ...currVal, synthName: value as SynthName }))
  }

  return (
    <SynthControllerContainer>
      {SYNTH_DOTS.map((synthName) => (
        <SynthDotButton key={synthName} onClick={handleSynth} value={synthName}>
          <SynthDot isActive={rhythmConfigSynthName === synthName} />
        </SynthDotButton>
      ))}
    </SynthControllerContainer>
  )
}
export default SynthController
