import Introduce from '@/components/Introduce'
import styled from '@emotion/styled'
import React from 'react'
import MasterVolumeController from './Controller/Config/MasterVolumeController'
import Player from './Controller/Config/Player'

const FooterContainer = styled.footer`
  background: #212428;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 98;
  border-top: 1px solid #797c814d;
`

const Footer = () => {
  return (
    <FooterContainer>
      <Introduce />
      <Player />
      <MasterVolumeController />
    </FooterContainer>
  )
}
export default Footer
