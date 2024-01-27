import { ReactComponent as VolumeUp } from '@/assets/icon/volume-up.svg'
import { ReactComponent as VolumeX } from '@/assets/icon/volume-x.svg'
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
    setMasterVolume(valueLimit(percent, 0, 1))
  }

  return (
    <MasterVolumeSliderContainer>
      <ActiveButton onClick={handleMute} icon={isMute ? <VolumeX /> : <VolumeUp />} />
      <Slider progress={isMute ? 0 : masterVolume} onDrag={handleVolume} direction="horizontal" />
    </MasterVolumeSliderContainer>
  )
}
export default MasterVolumeSlider
