import withPitch from '@/recoil/rhythm/withPitch'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { useRecoilState } from 'recoil'

const PitchControllerContainer = styled.div`
  display: flex;
  margin: 0 20px;
  height: 100px;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
`

const PitchDotButton = styled.button`
  display: flex;
  flex: 1;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  align-items: center;
`

type PitchDotProps = { isActive: boolean }
const PitchDot = styled.div<PitchDotProps>`
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

const PITCH_DOTS = [6, 5, 4, 2, 1]
const PitchController = () => {
  const [rhythmPitch, setRhythmPitch] = useRecoilState(withPitch)

  const handlePitch = ({ currentTarget: { value } }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setRhythmPitch(Number(value))
  }

  return (
    <PitchControllerContainer>
      {PITCH_DOTS.map((value) => (
        <PitchDotButton key={value} onClick={handlePitch} value={value}>
          <PitchDot isActive={rhythmPitch === value} />
        </PitchDotButton>
      ))}
    </PitchControllerContainer>
  )
}
export default PitchController
