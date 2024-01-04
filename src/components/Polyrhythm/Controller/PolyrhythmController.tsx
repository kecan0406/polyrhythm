import React from 'react'
import IntervalController from './IntervalController'
import NoteController from './NoteController'
import TargetController from './TargetController'
import VolumeController from './VolumeController'

const PolyrhythmController = () => {
  return (
    <div className="Controller">
      <TargetController />
      <div className="GeneratorController">
        <IntervalController />
        <NoteController />
      </div>
      <VolumeController />
    </div>
  )
}
export default PolyrhythmController
