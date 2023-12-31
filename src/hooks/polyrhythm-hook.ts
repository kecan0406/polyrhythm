import { RefObject, useEffect, useRef } from 'react'
import { PolyrhythmManager } from '../lib/polyrhythm'

export const usePolyrhythm = () => {
  const polyrhythmManagerRef: RefObject<PolyrhythmManager> = useRef<PolyrhythmManager>(new PolyrhythmManager())

  useEffect(() => {
    const polyrhythmManager = polyrhythmManagerRef.current!
    polyrhythmManager.repeat()

    return () => polyrhythmManager.repeatCancel()
  }, [])

  return polyrhythmManagerRef
}
