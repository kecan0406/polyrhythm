import React from 'react'
import PolyrhythmPlayground from './PolyrhythmCanvas'

function Polyrhythm() {
  return (
    <div className="Polyrhythm">
      <PolyrhythmController />
      <PolyrhythmPlayground />
    </div>
  )
}

function PolyrhythmController() {
  return <div className="Controller" />
}
export default Polyrhythm
