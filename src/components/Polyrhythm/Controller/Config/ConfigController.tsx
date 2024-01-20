import Piano from '@/components/Polyrhythm/Controller/Config/Piano'
import SynthController from '@/components/Polyrhythm/Controller/Config/SynthController'
import styled from '@emotion/styled'
import React from 'react'

const ControllerContainer = styled.div`
  margin-bottom: 4rem;
  color: rgb(209, 210, 211);
`

const ConfigController = () => {
  return (
    <ControllerContainer>
      <SynthController />
      <Piano />
    </ControllerContainer>
  )
}
export default ConfigController
