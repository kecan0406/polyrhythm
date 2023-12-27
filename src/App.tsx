import React, { RefObject, useRef, useState } from 'react'
import './App.scss'
import PolyrhythmCanvas from './components/PolyrhythmCanvas'
import PolyrhythmStarter from './components/PolyrhythmStarter'
import { useClientWidthHeight } from './hooks/canvas-hook'

function App() {
  const mainRef: RefObject<HTMLElement> = useRef<HTMLElement>(null)
  const { width: clientWidth, height: clientHeight } =
    useClientWidthHeight(mainRef)

  const [isLoadPolyrhythm, setIsLoadPolyrhythm] = useState(false)
  const handleLoadPolyrhythm = () => setIsLoadPolyrhythm(true)

  return (
    <main className="Main" ref={mainRef}>
      {isLoadPolyrhythm ? (
        <PolyrhythmCanvas width={clientWidth} height={clientHeight} />
      ) : (
        <PolyrhythmStarter onClick={handleLoadPolyrhythm} />
      )}
    </main>
  )
}

export default App
