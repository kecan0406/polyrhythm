import AudioInterface from '@/components/Drawer/AudioInterface'
import RhythmList from '@/components/Drawer/RhythmList'
import styled from '@emotion/styled'
import React from 'react'
import Drawer from './Drawer/Drawer'
import Footer from './Footer/Footer'
import Main from './Main'

const PolyrhythmContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const Polyrhythm = () => {
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
