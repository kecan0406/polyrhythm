import AudioInterface from '@/components/Drawer/AudioInterface'
import RhythmList from '@/components/Drawer/RhythmList'
import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { getTransport } from 'tone'
import Drawer from './Drawer/Drawer'
import Footer from './Footer/Footer'
import Main from './Main'

const PolyrhythmContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const Polyrhythm = () => {
  useEffect(() => {
    const transport = getTransport()
    transport.loop = true
    transport.loopStart = 0
    transport.loopEnd = '1m'
    transport.timeSignature = [4, 4]
  }, [])

  return (
    <PolyrhythmContainer>
      <Drawer>
        <RhythmList />
        <AudioInterface />
      </Drawer>
      <Main />
      <Footer />
    </PolyrhythmContainer>
  )
}

export default Polyrhythm
