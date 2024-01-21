import { PolyrhythmProvider } from '@/hooks/polyrhythm-hook'
import styled from '@emotion/styled'
import React from 'react'
import Drawer from './Drawer'
import Footer from './Footer'
import Playground from './Playground'

const PolyrhythmContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const Polyrhythm = () => {
  return (
    <PolyrhythmProvider>
      <PolyrhythmContainer>
        <Drawer />
        <Playground />
      </PolyrhythmContainer>
      <Footer />
    </PolyrhythmProvider>
  )
}

export default Polyrhythm
