import DrawerButton from '@/elements/inputs/DrawerButton'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'

type DrawerContainerProps = { isOpen: boolean; initialRender: boolean }
const DrawerContainer = styled.div<DrawerContainerProps>`
  background: #17191d;
  position: absolute;
  display: flex;
  flex-direction: column;
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

type DrawerProps = { children: React.ReactNode }
const Drawer = ({ children }: DrawerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [initialRender, setInitialRender] = useState<boolean>(true)

  const handleDrawer = () => {
    setIsOpen(!isOpen)
    setInitialRender(false)
  }

  return (
    <DrawerContainer initialRender={initialRender} isOpen={isOpen}>
      {children}
      <DrawerButton onClick={handleDrawer} isOpen={isOpen} />
    </DrawerContainer>
  )
}
export default Drawer
