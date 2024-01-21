import { ReactComponent as VolumeUpIcon } from '@/assets/icon/volume-up.svg'
import { ReactComponent as VolumeXIcon } from '@/assets/icon/volume-x.svg'
import ActiveButton from '@/elements/inputs/ActiveButton'
import ProgressBar from '@/elements/inputs/ProgressBar'
import { linear2db } from '@/lib/utils/math-util'
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
const MasterVolume = styled.div`
  display: flex;
  flex: 0 1 125px;
  align-items: center;
`
const MasterVolumeSlider = () => {
  const [masterVolume, setMasterVolume] = useState<number>(0.5)
  const [isMute, setIsMute] = useState<boolean>(false)
  const [isHover, setIsHover] = useState<boolean>(false)

  useEffect(() => {
    const destination = getDestination()
    destination.volume.value = linear2db(isMute ? 0 : masterVolume)
  }, [masterVolume, isMute])

  const handleMute = () => {
    setIsMute(!isMute)
  }

  const handleVolume = (percent: number) => {
    setIsMute(isMute ? false : percent <= 0)
    setMasterVolume(percent <= 0 ? 0 : percent >= 1 ? 1 : percent)
  }

  return (
    <MasterVolumeSliderContainer>
      <MasterVolume onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <ActiveButton onClick={handleMute}>{isMute ? <VolumeXIcon /> : <VolumeUpIcon />}</ActiveButton>
        <ProgressBar progress={isMute ? 0 : masterVolume} isHover={isHover} onDrag={handleVolume} />
      </MasterVolume>
    </MasterVolumeSliderContainer>
  )
}
export default MasterVolumeSlider
