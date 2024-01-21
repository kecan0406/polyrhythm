import { PolyrhythmProvider } from '@/hooks/polyrhythm-hook'
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
    <PolyrhythmProvider>
      <PolyrhythmContainer>
        <Drawer />
        <Main />
        <Footer />
      </PolyrhythmContainer>
    </PolyrhythmProvider>
  )
}

export default Polyrhythm
