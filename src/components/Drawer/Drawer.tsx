import AudioInterface from '@/components/Drawer/AudioInterface'
import DrawerButton from '@/elements/inputs/DrawerButton'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'

type DrawerProps = { isOpen: boolean; initialRender: boolean }
const DrawerContainer = styled.div<DrawerProps>`
  background: #17191d;
  position: absolute;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  width: 260px;
  height: 100%;
  animation: ${({ initialRender, isOpen }) => !initialRender && slideAnimation(isOpen)} 0.15s ease forwards;
`
const slideAnimation = (isShow: boolean) => keyframes`
    from {
        transform: translateX(${isShow && '-100%'});
    }
    to {
        transform: translateX(${!isShow && '-100%'});
    }
`

const Drawer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [initialRender, setInitialRender] = useState<boolean>(true)

  const handleDrawer = () => {
    setIsOpen(!isOpen)
    setInitialRender(false)
  }

  return (
    <DrawerContainer initialRender={initialRender} isOpen={isOpen}>
      <AudioInterface />
      <DrawerButton onClick={handleDrawer} isOpen={isOpen} />
    </DrawerContainer>
  )
}
export default Drawer
