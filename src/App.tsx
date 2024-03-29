import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { RecoilRoot } from 'recoil'
import { globalStyle } from './commons/styles/global-style'
import Polyrhythm from './components/Polyrhythm'
import Starter from './components/Starter'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`

const App = () => {
  const [isMountStarter, setIsMountStarter] = useState<boolean>(true)
  const [isMountMain, setIsMountMain] = useState<boolean>(false)
  const handlePolyrhythmReady = () => {
    setIsMountMain(true)
    const fadeout = setTimeout(() => {
      setIsMountStarter(false)
      clearTimeout(fadeout)
    }, 1500)
  }

  return (
    <RecoilRoot>
      <Global styles={globalStyle} />
      <Container>
        {isMountStarter && <Starter onClick={handlePolyrhythmReady} />}
        {isMountMain && <Polyrhythm />}
      </Container>
    </RecoilRoot>
  )
}
export default App
