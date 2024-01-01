import React from 'react'
import { PolyrhythmManagerProvider } from '../../hooks/polyrhythm-hook'
import PolyrhythmController from './PolyrhythmController'
import PolyrhythmPlayground from './PolyrhythmPlayground'

const Polyrhythm = () => {
  return (
    <PolyrhythmManagerProvider>
      <div className="Polyrhythm">
        <PolyrhythmController />
        <PolyrhythmPlayground />
      </div>
    </PolyrhythmManagerProvider>
  )
}

export default Polyrhythm
