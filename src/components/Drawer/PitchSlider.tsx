import Slider from '@/elements/inputs/Slider'
import { rhythmConfigState } from '@/recoil/config/atom'
import { valueLimit } from '@/utils/math-util'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'

const PitchSliderContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  flex-direction: column;
`
const PitchDisplay = styled.div``

const PITCHES = [1, 2, 3, 4, 5, 6]
const PitchSlider = () => {
  const [pitchProgress, setPitchProgress] = useState<number>(0)
  const setRhythmConfig = useSetRecoilState(rhythmConfigState)

  useEffect(() => {
    setRhythmConfig((currVal) => ({ ...currVal, pitch: Math.round(pitchProgress * (PITCHES.length - 1)) }))
  }, [pitchProgress])

  const handlePitch = (percent: number) => {
    setPitchProgress(valueLimit(percent))
  }

  return (
    <PitchSliderContainer>
      <PitchDisplay>{PITCHES[Math.round(pitchProgress * (PITCHES.length - 1))]}</PitchDisplay>
      <Slider progress={pitchProgress} onDrag={handlePitch} direction="vertical" />
    </PitchSliderContainer>
  )
}
export default PitchSlider
