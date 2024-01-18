import styled from '@emotion/styled'
import React from 'react'

type ActiveButtonContainerProps = { size: number }
const ActiveButtonContainer = styled.button<ActiveButtonContainerProps>`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  min-width: ${({ size }) => size}px;
  background-image: none;
  background-color: transparent;
  border: none;
  fill: hsla(0, 0%, 100%, 0.7);

  :hover {
    fill: #fff;
  }
  & > svg {
    width: 75%;
    height: 75%;
  }
`
const ActiveButton = ({
  children,
  onClick,
  size = 32,
}: {
  children: React.ReactNode
  onClick?: () => void
  size?: number
}) => {
  return (
    <ActiveButtonContainer size={size} onClick={onClick}>
      {children}
    </ActiveButtonContainer>
  )
}
export default ActiveButton
