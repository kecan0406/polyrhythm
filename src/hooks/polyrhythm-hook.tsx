import React, {
  createContext,
  MutableRefObject,
  RefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import * as Tone from 'tone'
import { getDestination, Volume } from 'tone'
import { Transport } from 'tone/build/esm/core/clock/Transport'
import { Note } from 'tone/build/esm/core/type/NoteUnits'
import { Decibels, Time } from 'tone/build/esm/core/type/Units'
import { getBeepSynth } from '../lib/instruments'
import { Point } from '../types/canvas-types'
import { Rhythm } from '../types/polyrhythm-types'

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
  const transport = useTransport()

  const intervalRef: MutableRefObject<Time> = useRef<Time>('3n')
  const noteRef: MutableRefObject<Note> = useRef<Note>('C4')

  const actions: PolyrhythmActions = useMemo(
    () => ({
      register: (position: Point) => {
        const interval = intervalRef.current
        const note = noteRef.current
        const beepSynth = getBeepSynth().toDestination()

        const id = transport!.scheduleRepeat((time) => {
          beepSynth.triggerAttackRelease(note, time, 0.05)
        }, interval)

        const rhythm: Rhythm = { id, interval, position }
        setPolyrhythm(polyrhythm.concat(rhythm))
      },
      deregister: () => {
        const rhythm = polyrhythm.at(-1)
        rhythm && transport!.clear(rhythm.id)
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

const useTransport = () => {
  const transportRef: RefObject<Transport> = useRef<Transport>(Tone.getTransport())
  useEffect(() => {
    const transport = transportRef.current!
    transport.start(0)
  }, [])
  return transportRef.current
}

export const useVolume = () => {
  const volumeRef: RefObject<Volume> = useRef<Volume>(new Tone.Volume().toDestination())
  return volumeRef.current
}
