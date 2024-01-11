import React from 'react'
import { PolyrhythmConfigProvider } from '../../hooks/polyrhythm-config-hook'
import { PolyrhythmProvider } from '../../hooks/polyrhythm-hook'
import { TransportProvider } from '../../hooks/transport-hook'
import PolyrhythmController from './Controller/PolyrhythmController'
import PolyrhythmPlayground from './PolyrhythmPlayground'

const Polyrhythm = () => {
  return (
    <TransportProvider>
      <PolyrhythmConfigProvider>
        <PolyrhythmProvider>
          <div className="Polyrhythm">
            <PolyrhythmController />
            <PolyrhythmPlayground />
          </div>
        </PolyrhythmProvider>
      </PolyrhythmConfigProvider>
    </TransportProvider>
  )
}

export default Polyrhythm
