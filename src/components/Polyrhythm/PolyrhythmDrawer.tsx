import DrawerButton from '@/elements/inputs/DrawerButton'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import ConfigController from './Controller/Config/ConfigController'

type DrawerProps = { isOpen: boolean; initialRender: boolean }
const Drawer = styled.div<DrawerProps>`
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

const PolyrhythmDrawer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [initialRender, setInitialRender] = useState<boolean>(true)

  const handleDrawer = () => {
    setIsOpen(!isOpen)
    setInitialRender(false)
  }

  return (
    <Drawer initialRender={initialRender} isOpen={isOpen}>
      <ConfigController />
      <DrawerButton onClick={handleDrawer} isOpen={isOpen} />
    </Drawer>
  )
}
export default PolyrhythmDrawer
