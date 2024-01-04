import React from 'react'
import ConfigController from './Config/ConfigController'
import './Controller.scss'
import RhythmController from './Rhythm/RhythmController'

const PolyrhythmController = () => {
  return (
    <div className="Controller">
      <RhythmController />
      <ConfigController />
    </div>
  )
}
export default PolyrhythmController
