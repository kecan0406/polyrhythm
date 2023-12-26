import React from 'react'
import usePolyrhythmGenerator from '../hooks/polyrhythm-hook'

function Polyrhythm() {
  const polyrhythmGenerator = usePolyrhythmGenerator()

  const handlePolyrhythm = () => {
    polyrhythmGenerator.generateRandomSynth()
  }

  const handleCancelPolyrhythm = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    polyrhythmGenerator.clearSynth()
  }

  return (
    <div
      className="Polyrhythm"
      onClick={handlePolyrhythm}
      onContextMenu={handleCancelPolyrhythm}
    />
  )
}
export default Polyrhythm
