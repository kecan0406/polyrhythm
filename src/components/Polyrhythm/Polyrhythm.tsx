import React from 'react'
import { InteractionProvider } from '../../hooks/interaction-hook'
import { PolyrhythmManagerProvider } from '../../hooks/polyrhythm-hook'
import PolyrhythmController from './PolyrhythmController'
import PolyrhythmPlayground from './PolyrhythmPlayground'

const Polyrhythm = () => {
  return (
    <InteractionProvider>
      <PolyrhythmManagerProvider>
        <div className="Polyrhythm">
          <PolyrhythmController />
          <PolyrhythmPlayground />
        </div>
      </PolyrhythmManagerProvider>
    </InteractionProvider>
  )
}

export default Polyrhythm
