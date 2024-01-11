import React, { createContext, RefObject, useContext, useEffect, useRef } from 'react'
import { getTransport } from 'tone'
import { Transport } from 'tone/build/esm/core/clock/Transport'

const TransportContext = createContext<Transport | null>(null)

export const TransportProvider = ({ children }: { children: React.ReactNode }) => {
  const transportRef: RefObject<Transport> = useRef<Transport>(getTransport())

  useEffect(() => {
    const transport = transportRef.current!
    transport.loop = true
    transport.loopStart = 0
    transport.loopEnd = '1m'
    transport.timeSignature = [4, 4]
    transport.start(0)
  }, [])

  return <TransportContext.Provider value={transportRef.current!}>{children}</TransportContext.Provider>
}

export const useTransport = () => {
  const transport = useContext(TransportContext)
  if (!transport) throw Error('useTransport must be used within TransportProvider')
  return transport
}
