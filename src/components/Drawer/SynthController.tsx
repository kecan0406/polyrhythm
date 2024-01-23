import { SynthName } from '@/lib/instruments'
import withSynthName from '@/recoil/rhythm/withSynthName'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { useRecoilState } from 'recoil'

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
  const [configSynthName, setConfigSynthName] = useRecoilState(withSynthName)

  const handleSynth = ({ currentTarget: { value } }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setConfigSynthName(value as SynthName)
  }

  return (
    <SynthControllerContainer>
      {SYNTH_DOTS.map((synthName) => (
        <SynthDotButton key={synthName} onClick={handleSynth} value={synthName}>
          <SynthDot isActive={configSynthName === synthName} />
        </SynthDotButton>
      ))}
    </SynthControllerContainer>
  )
}
export default SynthController
