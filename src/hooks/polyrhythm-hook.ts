import { useRef } from 'react'
import { PolyrhythmGenerator } from '../lib/polyrhythm'

const usePolyrhythmGenerator = (): PolyrhythmGenerator => {
  const polyrhythmRef = useRef<PolyrhythmGenerator>(new PolyrhythmGenerator())
  return polyrhythmRef.current
}

export default usePolyrhythmGenerator
