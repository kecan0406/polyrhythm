import React from 'react'
import IntervalController from './IntervalController'
import NoteController from './NoteController'
import RhythmList from './RhythmList'
import VolumeController from './VolumeController'

const PolyrhythmController = () => {
  return (
    <div className="Controller">
      <RhythmList />
      <IntervalController />
      <NoteController />
      <VolumeController />
    </div>
  )
}
export default PolyrhythmController
