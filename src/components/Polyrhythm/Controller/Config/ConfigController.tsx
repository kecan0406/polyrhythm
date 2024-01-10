import React from 'react'
import BpmController from './BpmController'
import IntervalController from './IntervalController'
import MasterVolumeController from './MasterVolumeController'
import NoteController from './NoteController'

const ConfigController = () => {
  return (
    <div className="ConfigController">
      <BpmController />
      <IntervalController />
      <NoteController />
      <MasterVolumeController />
    </div>
  )
}
export default ConfigController
