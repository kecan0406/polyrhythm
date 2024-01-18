import Introduce from '@/components/Introduce'
import styled from '@emotion/styled'
import React from 'react'
import MasterVolumeController from './Controller/Config/MasterVolumeController'
import PlayController from './Controller/Config/PlayController'

const Footer = styled.footer`
  background: #212428;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3rem;
  z-index: 98;
  border-top: 1px solid #797c814d;
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
        <Introduce />
        <PlayController />
        <MasterVolumeController />
      </FooterContainer>
    </Footer>
  )
}
export default PolyrhythmFooter
