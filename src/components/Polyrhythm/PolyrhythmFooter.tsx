import styled from '@emotion/styled'
import React from 'react'
import MasterVolumeController from './Controller/Config/MasterVolumeController'

const Footer = styled.footer`
  background: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3rem;
  z-index: 98;
  border-top: 1px solid #cecece;
`

const FooterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const PolyrhythmFooter = () => {
  return (
    <Footer>
      <FooterContainer>
        <div />
        <MasterVolumeController />
      </FooterContainer>
    </Footer>
  )
}
export default PolyrhythmFooter
