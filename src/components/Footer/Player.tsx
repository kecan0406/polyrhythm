import { ReactComponent as FastForward } from '@/assets/icon/fast-forward.svg'
import { ReactComponent as FastRewind } from '@/assets/icon/fast-rewind.svg'
import { ReactComponent as Pause } from '@/assets/icon/pause.svg'
import { ReactComponent as PlayArrow } from '@/assets/icon/play-arrow.svg'
import ActiveButton from '@/elements/inputs/ActiveButton'
import { useInstrument } from '@/hooks/useInstrument'
import { valueLimit } from '@/utils/math-util'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { getTransport } from 'tone'

const PlayerContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
`
const Play = styled.div`
  display: flex;
  align-items: center;
`
const Player = () => {
  const instrumentRef = useInstrument('tryAmSynth')
  const [isPlaying, setIsPlaying] = useState<boolean>(true)

  const handlePlay = () => {
    const transport = getTransport()
    isPlaying ? transport.pause() : transport.start()
    setIsPlaying(!isPlaying)
  }

  const handleBpm = (plusBpm: number) => () => {
    const transport = getTransport()
    const instrument = instrumentRef.current!

    transport.bpm.value = valueLimit(transport.bpm.value + plusBpm, 0)
    instrument.trigger(transport.bpm.value * 2.5, 0.05)
  }

  return (
    <PlayerContainer>
      <Play>
        <ActiveButton onClick={handleBpm(-5)} size={32} icon={<FastRewind />} />
        <ActiveButton onClick={handlePlay} size={48} icon={isPlaying ? <PlayArrow /> : <Pause />} />
        <ActiveButton onClick={handleBpm(5)} size={32} icon={<FastForward />} />
      </Play>
    </PlayerContainer>
  )
}
export default Player
