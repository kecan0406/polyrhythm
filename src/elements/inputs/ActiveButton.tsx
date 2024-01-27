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
  onClick,
  size = 32,
  icon,
}: {
  onClick?: () => void
  size?: number | string
  icon: React.ReactNode
}) => {
  return (
    <ActiveButtonContainer size={Number(size)} onClick={onClick}>
      {icon}
    </ActiveButtonContainer>
  )
}
export default ActiveButton
