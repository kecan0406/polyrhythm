import React, { RefObject, useRef, useState } from 'react'
import './App.scss'
import PolyrhythmCanvas from './components/PolyrhythmCanvas'
import PolyrhythmStarter from './components/PolyrhythmStarter'
import { useClientWidthHeight } from './hooks/canvas-hook'

function App() {
  const mainRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
  const { width: clientWidth, height: clientHeight } =
    useClientWidthHeight(mainRef)

  const [isLoadPolyrhythm, setIsLoadPolyrhythm] = useState(false)
  const handleLoadPolyrhythm = () => setIsLoadPolyrhythm(true)

  return (
    <div className="Main" ref={mainRef}>
      {isLoadPolyrhythm ? (
        <PolyrhythmCanvas width={clientWidth} height={clientHeight} />
      ) : (
        <PolyrhythmStarter onClick={handleLoadPolyrhythm} />
      )}
    </div>
  )
}

export default App
