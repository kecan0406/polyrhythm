import styled from '@emotion/styled'
import React from 'react'
import * as Tone from 'tone'

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
`

type PolyrhythmStarterProps = { onClick: () => void }
const PolyrhythmStarter = ({ onClick: close }: PolyrhythmStarterProps) => {
  const handleTransportStart = async () => {
    Tone.setContext(new Tone.Context({ latencyHint: 'interactive' }))
    await Tone.start()
    const transport = Tone.getTransport()
    transport.start(0)
    close()
  }
  return <Container onClick={handleTransportStart} />
}

export default PolyrhythmStarter
