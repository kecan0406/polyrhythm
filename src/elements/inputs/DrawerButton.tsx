import styled from '@emotion/styled'
import React, { useState } from 'react'

const DrawerHandler = styled.button`
  position: fixed;
  top: 50%;
  left: 260px;
  width: 32px;
  height: 72px;
  opacity: 0.25;
  transition: opacity 0.25s;
  &:hover {
    opacity: 1;
  }
  cursor: pointer;
  background-image: none;
  background-color: transparent;
  border: none;
`
const BarWrapper = styled.div`
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  flex-direction: column;
  align-items: center;
`
type BarProps = { isPlus: boolean; isOpen: boolean; isHover: boolean }
const Bar = styled.div<BarProps>`
  background: white;
  border-radius: 9999px;
  width: 0.25rem;
  height: 0.75rem;
  transition: transform 0.25s;
  transform: ${({ isPlus, isOpen, isHover }) => {
    const translateY = `translateY(${isPlus ? 0.15 : -0.15}rem)`
    const rotate = `rotate(${isOpen ? (isHover ? (isPlus ? 15 : -15) : 0) : isPlus ? -15 : 15}deg)`
    return `${translateY} ${rotate}`
  }};
`

const DrawerButton = ({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) => {
  const [isHover, setIsHover] = useState<boolean>(false)
  return (
    <DrawerHandler onClick={onClick} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <BarWrapper>
        <Bar isPlus={true} isOpen={isOpen} isHover={isHover} />
        <Bar isPlus={false} isOpen={isOpen} isHover={isHover} />
      </BarWrapper>
    </DrawerHandler>
  )
}
export default DrawerButton
