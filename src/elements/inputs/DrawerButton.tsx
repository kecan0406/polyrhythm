import styled from '@emotion/styled'
import React, { useState } from 'react'

const DrawerHandler = styled.button`
  position: fixed;
  top: 50%;
  left: 260px;
  width: 32px;
  height: 72px;
  opacity: 0.25;
  transform: translateY(-50%);
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
type BarProps = { isPlus: boolean; open: boolean; hover: boolean }
const Bar = styled.div<BarProps>`
  background: white;
  border-radius: 9999px;
  width: 0.25rem;
  height: 0.75rem;
  transition: transform 0.25s;
  transform: ${({ isPlus, open, hover }) => {
    const translateY = `translateY(${isPlus ? 0.15 : -0.15}rem)`
    const rotate = `rotate(${open ? (hover ? (isPlus ? 15 : -15) : 0) : isPlus ? -15 : 15}deg)`
    return `${translateY} ${rotate}`
  }};
`

const DrawerButton = ({ onClick, open }: { onClick: () => void; open: boolean }) => {
  const [hover, setHover] = useState<boolean>(false)

  const handleHover = (hover: boolean) => () => {
    setHover(hover)
  }

  return (
    <DrawerHandler onClick={onClick} onMouseEnter={handleHover(true)} onMouseLeave={handleHover(false)}>
      <BarWrapper>
        <Bar isPlus={true} open={open} hover={hover} />
        <Bar isPlus={false} open={open} hover={hover} />
      </BarWrapper>
    </DrawerHandler>
  )
}
export default DrawerButton
