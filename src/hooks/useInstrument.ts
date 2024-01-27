import { Instruments, SynthName } from '@/lib/instruments'
import { MutableRefObject, useRef } from 'react'
import { getDestination } from 'tone'

export const useInstrument = (synthName: SynthName) => {
  const instrumentRef: MutableRefObject<Instruments | null> = useRef<Instruments | null>(null)
  if (!instrumentRef.current) {
    instrumentRef.current = new Instruments(synthName).connect(getDestination())
  }
  return instrumentRef
}
