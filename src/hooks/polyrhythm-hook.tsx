import { Rhythm } from '@/lib/polyrhythm'
import { rhythmConfigState } from '@/recoil/config/atom'
import { Point } from '@/types/canvas-types'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { Freeverb, getTransport } from 'tone'

type PolyrhythmActions = {
  register: (position: Point) => void
  deregister: () => void
  reset: (rhythm: Rhythm) => void
}
const PolyrhythmValueContext = createContext<Rhythm[]>([])
const PolyrhythmActionsContext = createContext<PolyrhythmActions>({
  register: () => {},
  deregister: () => {},
  reset: () => {},
})

export const PolyrhythmProvider = ({ children }: { children: React.ReactNode }) => {
  const freeVerb = useMemo(() => new Freeverb().toDestination(), [])
  const [polyrhythm, setPolyrhythm] = useState<Rhythm[]>([])
  const rhythmConfig = useRecoilValue(rhythmConfigState)

  useEffect(() => {
    const transport = getTransport()
    transport.loop = true
    transport.loopStart = 0
    transport.loopEnd = '1m'
    transport.timeSignature = [4, 4]
  }, [])

  const actions: PolyrhythmActions = useMemo(
    () => ({
      register: (position: Point) => {
        const rhythm = new Rhythm(polyrhythm.length, rhythmConfig, position)
        rhythm.instrument.connect(freeVerb)
        setPolyrhythm(polyrhythm.concat(rhythm))
      },
      deregister: () => {
        const rhythm = polyrhythm.at(-1)
        rhythm && rhythm.dispose()
        setPolyrhythm(polyrhythm.slice(0, -1))
      },
      reset: (rhythm: Rhythm) => {
        rhythm.reset()
        setPolyrhythm([...polyrhythm])
      },
    }),
    [polyrhythm, rhythmConfig],
  )

  return (
    <PolyrhythmActionsContext.Provider value={actions}>
      <PolyrhythmValueContext.Provider value={polyrhythm}>{children}</PolyrhythmValueContext.Provider>
    </PolyrhythmActionsContext.Provider>
  )
}

export const usePolyrhythmValue = () => useContext(PolyrhythmValueContext)
export const usePolyrhythmActions = () => useContext(PolyrhythmActionsContext)
