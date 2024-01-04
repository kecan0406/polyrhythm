import React from 'react'
import IntervalController from './IntervalController'
import NoteController from './NoteController'
import VolumeController from './VolumeController'

const PolyrhythmController = () => {
  return (
    <div className="Controller">
      <IntervalController />
      <NoteController />
      <VolumeController />
    </div>
  )
}
export default PolyrhythmController
