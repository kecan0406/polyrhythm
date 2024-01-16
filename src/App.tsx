import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { globalStyle } from './commons/styles/global-style'
import Polyrhythm from './components/Polyrhythm/Polyrhythm'
import PolyrhythmStarter from './components/Polyrhythm/PolyrhythmStarter'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`

const App = () => {
  const [isReady, setIsReady] = useState(false)
  const handlePolyrhythmReady = () => setIsReady(true)

  return (
    <Container>
      <Global styles={globalStyle} />
      {!isReady && <PolyrhythmStarter onClick={handlePolyrhythmReady} />}
      <Polyrhythm />
    </Container>
  )
}
export default App
