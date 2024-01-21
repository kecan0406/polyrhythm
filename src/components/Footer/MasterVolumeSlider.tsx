import { ReactComponent as VolumeUpIcon } from '@/assets/icon/volume-up.svg'
import { ReactComponent as VolumeXIcon } from '@/assets/icon/volume-x.svg'
import ActiveButton from '@/elements/inputs/ActiveButton'
import Slider from '@/elements/inputs/Slider'
import { linear2db, valueLimit } from '@/utils/math-util'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { getDestination } from 'tone'

const MasterVolumeSliderContainer = styled.div`
  display: flex;
  width: 30%;
  justify-content: flex-end;
  flex-grow: 1;
  margin-right: 12px;
`
const MasterVolumeSlider = () => {
  const [masterVolume, setMasterVolume] = useState<number>(0.5)
  const [isMute, setIsMute] = useState<boolean>(false)

  useEffect(() => {
    const destination = getDestination()
    destination.volume.value = linear2db(isMute ? 0 : masterVolume)
  }, [masterVolume, isMute])

  const handleMute = () => {
    setIsMute(!isMute)
  }

  const handleVolume = (percent: number) => {
    setIsMute(isMute ? false : percent <= 0)
    setMasterVolume(valueLimit(percent))
  }

  return (
    <MasterVolumeSliderContainer>
      <ActiveButton onClick={handleMute}>{isMute ? <VolumeXIcon /> : <VolumeUpIcon />}</ActiveButton>
      <Slider progress={isMute ? 0 : masterVolume} onDrag={handleVolume} direction="horizontal" />
    </MasterVolumeSliderContainer>
  )
}
export default MasterVolumeSlider
