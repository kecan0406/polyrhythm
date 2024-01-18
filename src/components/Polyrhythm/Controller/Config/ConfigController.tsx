import Piano from '@/components/Polyrhythm/Controller/Config/Piano'
import styled from '@emotion/styled'
import React from 'react'

const ControllerContainer = styled.div`
  margin-bottom: 3rem;
  color: rgb(209, 210, 211);
`

const ConfigController = () => {
  return (
    <ControllerContainer>
      <Piano />
    </ControllerContainer>
  )
}
export default ConfigController
