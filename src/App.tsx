import React, { useState } from 'react'
import './App.scss'
import Polyrhythm from './components/Polyrhythm'
import PolyrhythmStarter from './components/PolyrhythmStarter'

function App() {
  const [isLoadPolyrhythm, setIsLoadPolyrhythm] = useState(false)
  const handleLoadPolyrhythm = () => setIsLoadPolyrhythm(true)

  return (
    <main className="Main">
      {isLoadPolyrhythm ? (
        <Polyrhythm />
      ) : (
        <PolyrhythmStarter onClick={handleLoadPolyrhythm} />
      )}
    </main>
  )
}

export default App
