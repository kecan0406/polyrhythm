import Slider from '@/elements/inputs/Slider'
import { rhythmConfigState } from '@/recoil/config/atom'
import { valueLimit } from '@/utils/math-util'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'

const PitchSliderContainer = styled.div`
  width: 100%;
  height: 100%;
`

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
      <Slider progress={pitchProgress} onDrag={handlePitch} direction="vertical" />
    </PitchSliderContainer>
  )
}
export default PitchSlider
