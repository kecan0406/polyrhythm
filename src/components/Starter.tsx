import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import * as Tone from 'tone'

type StarterContainerProps = { clicked: boolean }
const StarterContainer = styled.div<StarterContainerProps>`
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: black;
  z-index: 99;
  color: white;
  & > h1 {
    font-family: Raleway, serif;
    font-weight: 100;
    font-size: 10rem;
    text-align: center;
    user-select: none;
  }
  animation: ${({ clicked }) => clicked && fadeoutAnimation()} 1.5s forwards;
`
const fadeoutAnimation = () => keyframes`
    from {
        color: white;
    }
    67% {
        color: black;
        opacity: 1;
    }
    to {
        color: black;
        opacity: 0;
    }
`

type StarterProps = { onClick: () => void }
const Starter = ({ onClick: close }: StarterProps) => {
  const [clicked, setClicked] = useState<boolean>(false)

  const handleTransportStart = async () => {
    if (clicked) return

    Tone.setContext(new Tone.Context({ latencyHint: 'interactive' }))
    await Tone.start()
    const transport = Tone.getTransport()
    transport.start(0)

    setClicked(true)
    close()
  }

  return (
    <StarterContainer onClick={handleTransportStart} clicked={clicked}>
      <h1>POLY RHYTHM</h1>
    </StarterContainer>
  )
}

export default Starter
