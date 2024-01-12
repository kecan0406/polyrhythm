import React from 'react'
import BpmController from './BpmController'
import IntervalController from './IntervalController'
import MasterVolumeController from './MasterVolumeController'
import NoteController from './NoteController'
import SynthController from './SynthController'

const ConfigController = () => {
  return (
    <div className="ConfigController">
      <BpmController />
      <IntervalController />
      <NoteController />
      <SynthController />
      <MasterVolumeController />
    </div>
  )
}
export default ConfigController
