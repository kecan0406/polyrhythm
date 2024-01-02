import React from 'react'
import { InteractionProvider } from '../../hooks/interaction-hook'
import { PolyrhythmProvider } from '../../hooks/polyrhythm-hook'
import PolyrhythmController from './PolyrhythmController'
import PolyrhythmPlayground from './PolyrhythmPlayground'

const Polyrhythm = () => {
  return (
    <InteractionProvider>
      <PolyrhythmProvider>
        <div className="Polyrhythm">
          <PolyrhythmController />
          <PolyrhythmPlayground />
        </div>
      </PolyrhythmProvider>
    </InteractionProvider>
  )
}

export default Polyrhythm
