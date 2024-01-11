import React from 'react'
import { PolyrhythmConfigProvider } from '../../hooks/polyrhythm-config-hook'
import { PolyrhythmProvider } from '../../hooks/polyrhythm-hook'
import PolyrhythmController from './Controller/PolyrhythmController'
import PolyrhythmPlayground from './PolyrhythmPlayground'

const Polyrhythm = () => {
  return (
    <PolyrhythmConfigProvider>
      <PolyrhythmProvider>
        <div className="Polyrhythm">
          <PolyrhythmController />
          <PolyrhythmPlayground />
        </div>
      </PolyrhythmProvider>
    </PolyrhythmConfigProvider>
  )
}

export default Polyrhythm
