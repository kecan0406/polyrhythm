import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import ConfigController from './Controller/Config/ConfigController'

type DrawerProps = { isShow: boolean; initialRender: boolean }
const Drawer = styled.div<DrawerProps>`
  background-color: white;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 260px;
  height: 100%;
  animation: ${({ initialRender, isShow }) => !initialRender && slideAnimation(isShow)} 0.15s ease forwards;
`
const slideAnimation = (isShow: boolean) => keyframes`
    from {
        transform: translateX(${isShow && '-100%'});
    }
    to {
        transform: translateX(${!isShow && '-100%'});
    }
`
const DrawerHandler = styled.button`
  position: fixed;
  top: 50%;
  left: 260px;
  width: 32px;
  height: 72px;
  opacity: 0.25;
  :hover {
    opacity: 1;
  }
  transition: opacity 0.25s;
`

const PolyrhythmDrawer = () => {
  const [isShow, setIsShow] = useState<boolean>(true)
  const [initialRender, setInitialRender] = useState<boolean>(true)

  const handleDrawer = () => {
    setIsShow(!isShow)
    setInitialRender(false)
  }

  return (
    <Drawer initialRender={initialRender} isShow={isShow}>
      <ConfigController />
      <DrawerHandler onClick={handleDrawer} />
    </Drawer>
  )
}
export default PolyrhythmDrawer
