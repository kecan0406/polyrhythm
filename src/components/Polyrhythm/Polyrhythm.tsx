import React from 'react'
import { usePolyrhythm } from '../../hooks/polyrhythm-hook'
import PolyrhythmController from './PolyrhythmController'
import PolyrhythmPlayground from './PolyrhythmPlayground'

const Polyrhythm = () => {
  usePolyrhythm()
  return (
    <div className="Polyrhythm">
      <PolyrhythmController />
      <PolyrhythmPlayground />
    </div>
  )
}

export default Polyrhythm
