import Introduce from '@/components/Footer/Introduce'
import MasterVolumeSlider from '@/components/Footer/MasterVolumeSlider'
import Player from '@/components/Footer/Player'
import styled from '@emotion/styled'
import React from 'react'

const FooterContainer = styled.footer`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: saturate(50%) blur(5px);
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 98;
  box-shadow: inset 0 1px 0 0 #333;
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
