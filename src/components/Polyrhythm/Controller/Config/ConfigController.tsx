import styled from '@emotion/styled'
import React from 'react'
import BpmController from './BpmController'
import IntervalController from './IntervalController'
import NoteController from './NoteController'
import SynthController from './SynthController'

const ControllerContainer = styled.div`
  margin-bottom: 3rem;
`

const ConfigController = () => {
  return (
    <ControllerContainer>
      <BpmController />
      <IntervalController />
      <NoteController />
      <SynthController />
    </ControllerContainer>
  )
}
export default ConfigController
