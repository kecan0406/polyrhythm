import Introduce from '@/components/Footer/Introduce'
import MasterVolumeSlider from '@/components/Footer/MasterVolumeSlider'
import Player from '@/components/Footer/Player'
import styled from '@emotion/styled'
import React from 'react'

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
      <MasterVolumeSlider />
    </FooterContainer>
  )
}
export default Footer
