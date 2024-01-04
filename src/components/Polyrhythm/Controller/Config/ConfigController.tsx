import React from 'react'
import IntervalController from './IntervalController'
import MasterVolumeController from './MasterVolumeController'
import NoteController from './NoteController'

const ConfigController = () => {
  return (
    <div className="ConfigController">
      <IntervalController />
      <NoteController />
      <MasterVolumeController />
    </div>
  )
}
export default ConfigController
