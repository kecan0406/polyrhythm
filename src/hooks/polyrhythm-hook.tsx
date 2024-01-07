import React, { createContext, MutableRefObject, useContext, useMemo, useRef, useState } from 'react'
import { getDestination } from 'tone'
import { Note } from 'tone/build/esm/core/type/NoteUnits'
import { Decibels } from 'tone/build/esm/core/type/Units'
import { Rhythm } from '../lib/polyrhythm'
import { Point } from '../types/canvas-types'

type PolyrhythmActions = {
  register: (position: Point) => void
  deregister: () => void
  setInterval: (interval: number) => void
  setNote: (note: Note) => void
  setMasterVolume: (volume: number) => void
}
const PolyrhythmValueContext = createContext<Rhythm[]>([])
const PolyrhythmActionsContext = createContext<PolyrhythmActions>({
  register: () => {},
  deregister: () => {},
  setInterval: () => {},
  setNote: () => {},
  setMasterVolume: () => {},
})

export const PolyrhythmProvider = ({ children }: { children: React.ReactNode }) => {
  const [polyrhythm, setPolyrhythm] = useState<Rhythm[]>([])

  const intervalRef: MutableRefObject<number> = useRef<number>(3)
  const noteRef: MutableRefObject<Note> = useRef<Note>('C4')

  const actions: PolyrhythmActions = useMemo(
    () => ({
      register: (position: Point) => {
        const id = polyrhythm.length
        const note = noteRef.current
        const interval = intervalRef.current
        const rhythm = new Rhythm(id, note, interval, position)
        setPolyrhythm(polyrhythm.concat(rhythm))
      },
      deregister: () => {
        const rhythm = polyrhythm.at(-1)
        rhythm && rhythm.clearRepeat()
        setPolyrhythm(polyrhythm.slice(0, -1))
      },
      setNote: (note: Note) => {
        noteRef.current = note
      },
      setInterval: (interval: number) => {
        intervalRef.current = interval
      },
      setMasterVolume: (vol: Decibels) => {
        getDestination().volume.value = vol
      },
    }),
    [polyrhythm],
  )

  return (
    <PolyrhythmActionsContext.Provider value={actions}>
      <PolyrhythmValueContext.Provider value={polyrhythm}>{children}</PolyrhythmValueContext.Provider>
    </PolyrhythmActionsContext.Provider>
  )
}

export const usePolyrhythmValue = () => useContext(PolyrhythmValueContext)
export const usePolyrhythmActions = () => useContext(PolyrhythmActionsContext)
