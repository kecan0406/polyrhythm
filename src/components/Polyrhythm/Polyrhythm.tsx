import { PolyrhythmProvider } from '@/hooks/polyrhythm-hook'
import styled from '@emotion/styled'
import React from 'react'
import PolyrhythmDrawer from './PolyrhythmDrawer'
import PolyrhythmFooter from './PolyrhythmFooter'
import PolyrhythmPlayground from './PolyrhythmPlayground'

const PolyrhythmContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const Polyrhythm = () => {
  return (
    <PolyrhythmProvider>
      <PolyrhythmContainer>
        <PolyrhythmDrawer />
        <PolyrhythmPlayground />
      </PolyrhythmContainer>
      <PolyrhythmFooter />
    </PolyrhythmProvider>
  )
}

export default Polyrhythm
