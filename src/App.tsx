/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import './App.scss'
import Polyrhythm from './components/Polyrhythm/Polyrhythm'
import PolyrhythmStarter from './components/Polyrhythm/PolyrhythmStarter'
const App = () => {
  const [isReady, setIsReady] = useState(false)
  const handlePolyrhythmReady = () => setIsReady(true)

  return isReady ? <Polyrhythm /> : <PolyrhythmStarter onClick={handlePolyrhythmReady} />
}
export default App
