import React from 'react'
import * as Tone from 'tone'

type PolyrhythmStarterProps = { onClick: () => void }
const PolyrhythmStarter = ({ onClick: close }: PolyrhythmStarterProps) => {
  const handleTransportStart = async () => {
    Tone.setContext(new Tone.Context({ latencyHint: 'interactive' }))
    await Tone.start()
    const transport = Tone.getTransport()
    transport.start(0)
    close()
  }
  return <div className="PolyrhythmStarter" onClick={handleTransportStart} />
}

export default PolyrhythmStarter
