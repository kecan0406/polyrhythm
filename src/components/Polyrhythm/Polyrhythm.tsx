import React from 'react'
import { PolyrhythmProvider } from '../../hooks/polyrhythm-hook'
import PolyrhythmController from './Controller/PolyrhythmController'
import PolyrhythmPlayground from './PolyrhythmPlayground'

const Polyrhythm = () => {
  return (
    <PolyrhythmProvider>
      <div className="Polyrhythm">
        <PolyrhythmController />
        <PolyrhythmPlayground />
      </div>
    </PolyrhythmProvider>
  )
}

export default Polyrhythm
