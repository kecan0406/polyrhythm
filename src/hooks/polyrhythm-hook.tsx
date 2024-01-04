import React, { createContext, MutableRefObject, useContext, useMemo, useRef, useState } from 'react'
import { getDestination } from 'tone'
import { Note } from 'tone/build/esm/core/type/NoteUnits'
import { Decibels, Time } from 'tone/build/esm/core/type/Units'
import { Rhythm } from '../lib/polyrhythm'
import { Point } from '../types/canvas-types'

type PolyrhythmActions = {
  register: (position: Point) => void
  deregister: () => void
  setInterval: (interval: Time) => void
  setNote: (note: Note) => void
  setVolume: (volume: number) => void
  setMasterVolume: (volume: number) => void
}
const PolyrhythmValueContext = createContext<Rhythm[]>([])
const PolyrhythmActionsContext = createContext<PolyrhythmActions>({
  register: () => {},
  deregister: () => {},
  setInterval: () => {},
  setNote: () => {},
  setVolume: () => {},
  setMasterVolume: () => {},
})

export const PolyrhythmProvider = ({ children }: { children: React.ReactNode }) => {
  const [polyrhythm, setPolyrhythm] = useState<Rhythm[]>([])

  const intervalRef: MutableRefObject<Time> = useRef<Time>('3n')
  const noteRef: MutableRefObject<Note> = useRef<Note>('C4')

  const actions: PolyrhythmActions = useMemo(
    () => ({
      register: (position: Point) => {
        const note = noteRef.current
        const interval = intervalRef.current
        const rhythm = new Rhythm(note, interval, position)
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
      setInterval: (interval: Time) => {
        intervalRef.current = interval
      },
      setVolume: () => {},
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
