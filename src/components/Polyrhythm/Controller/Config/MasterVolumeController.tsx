import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { getDestination } from 'tone'
import { ReactComponent as VolumeUpIcon } from '../../../../assets/icon/volume-up.svg'
import { ReactComponent as VolumeXIcon } from '../../../../assets/icon/volume-x.svg'
import ProgressBar from '../../../../elements/inputs/ProgressBar'
import { linear2db } from '../../../../lib/utils/math-util'

const MasterVolumeContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  text-align: center;
  flex-grow: 1;
  margin-right: 12px;
`
const MasterVolume = styled.div`
  display: flex;
  flex: 0 1 125px;
  align-items: center;
`
const VolumeButton = styled.button`
  position: relative;
  width: 32px;
  height: 32px;
  min-width: 32px;
  background-image: none;
  background-color: transparent;
  border: none;

  fill: hsla(0, 0%, 100%, 0.7);

  :hover {
    fill: #fff;
  }
`

const MasterVolumeController = () => {
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
    <MasterVolumeContainer>
      <MasterVolume onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <VolumeButton onClick={handleMute}>{isMute ? <VolumeXIcon /> : <VolumeUpIcon />}</VolumeButton>
        <ProgressBar progress={isMute ? 0 : masterVolume} isHover={isHover} onDrag={handleVolume} />
      </MasterVolume>
    </MasterVolumeContainer>
  )
}
export default MasterVolumeController
