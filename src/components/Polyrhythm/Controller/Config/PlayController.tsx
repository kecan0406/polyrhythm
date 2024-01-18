import { ReactComponent as Pause } from '@/assets/icon/pause.svg'
import { ReactComponent as PlayArrow } from '@/assets/icon/play-arrow.svg'
import ActiveButton from '@/elements/inputs/ActiveButton'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { getTransport } from 'tone'

const PlayContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Play = styled.div`
  display: flex;
`
const PlayController = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true)

  const handlePlay = () => {
    const transport = getTransport()
    isPlaying ? transport.pause() : transport.start()
    setIsPlaying(!isPlaying)
  }

  return (
    <PlayContainer>
      <Play>
        <ActiveButton onClick={handlePlay} size={48}>
          {isPlaying ? <PlayArrow /> : <Pause />}
        </ActiveButton>
      </Play>
    </PlayContainer>
  )
}
export default PlayController
