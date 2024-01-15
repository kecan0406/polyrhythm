import styled from '@emotion/styled'
import React from 'react'
import BpmController from './BpmController'
import IntervalController from './IntervalController'
import MasterVolumeController from './MasterVolumeController'
import NoteController from './NoteController'
import SynthController from './SynthController'

const ControllerContainer = styled.div``

const ConfigController = () => {
  return (
    <ControllerContainer>
      <BpmController />
      <IntervalController />
      <NoteController />
      <SynthController />
      <MasterVolumeController />
    </ControllerContainer>
  )
}
export default ConfigController
