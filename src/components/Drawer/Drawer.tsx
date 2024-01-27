import DrawerButton from '@/elements/inputs/DrawerButton'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'

type DrawerContainerProps = { isOpen: boolean; initialRender: boolean }
const DrawerContainer = styled.div<DrawerContainerProps>`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: saturate(50%) blur(5px);
  border-right: solid 1px #333;
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
  const [open, setOpen] = useState<boolean>(true)
  const [initialRender, setInitialRender] = useState<boolean>(true)

  const handleDrawer = () => {
    setOpen(!open)
    setInitialRender(false)
  }

  return (
    <DrawerContainer initialRender={initialRender} isOpen={open}>
      {children}
      <DrawerButton onClick={handleDrawer} open={open} />
    </DrawerContainer>
  )
}
export default Drawer
