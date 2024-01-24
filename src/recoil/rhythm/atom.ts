import { SynthName } from '@/lib/instruments'
import { Point } from '@/types/canvas-types'
import { atom, atomFamily, selector } from 'recoil'

export type RhythmId = number
export type NoteSymbol = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B' | 'B#' | 'C#' | 'D#' | 'E#' | 'F#' | 'G#' | 'A#'
export type RhythmConfig = {
  interval: number
  synthName: SynthName
  noteSymbol: NoteSymbol
  pitch: number
  position: Point
}
const rhythmConfigAtom = atom<RhythmConfig>({
  key: 'rhythmConfigAtom',
  default: {
    interval: 3,
    synthName: 'beep',
    noteSymbol: 'C',
    pitch: 5,
    position: { x: 0, y: 0 },
  },
})

export default rhythmConfigAtom

export const rhythmConfigFamily = atomFamily<RhythmConfig, RhythmId>({
  key: 'rhythmConfigFamily',
  default: selector({
    key: 'rhythmConfigFamily/default',
    get: ({ get }) => get(rhythmConfigAtom),
  }),
})

export const rhythmConfigWithList = selector<RhythmConfig[]>({
  key: 'rhythmConfigWithList',
  get: ({ get }) => {
    const rhythmConfigList = get(rhythmIdsAtom)
    return rhythmConfigList.map((id) => get(rhythmConfigFamily(id)))
  },
})

export const rhythmConfigWithRegister = selector({
  key: 'rhythmConfigWithRegister',
  get: ({ get }) => rhythmConfigFamily(get(rhythmIdsAtom).length),
  set: ({ set, get }, rhythmConfig) => {
    const rhythmId = get(rhythmIdsAtom).length
    set(rhythmConfigFamily(rhythmId), rhythmConfig)
    set(rhythmIdsAtom, (prev) => [...prev, rhythmId])
  },
})

export const rhythmConfigWithDeregister = selector({
  key: 'rhythmConfigWithDeregister',
  get: ({ get }) => get(rhythmIdsAtom).at(-1),
  set: ({ set, get, reset }) => {
    const lastRhythmId = get(rhythmIdsAtom).at(-1)
    if (lastRhythmId !== undefined) {
      reset(rhythmConfigFamily(lastRhythmId))
      set(rhythmIdsAtom, (prev) => prev.filter((id) => id !== lastRhythmId))
    }
  },
})

export const rhythmSelectAtom = atom<RhythmId | null>({
  key: 'rhythmSelectAtom',
  default: null,
})

export const rhythmConfigWithSelect = selector({
  key: 'rhythmConfigWithSelect',
  get: ({ get }) => {
    const rhythmId = get(rhythmSelectAtom)
    return rhythmId === null ? get(rhythmConfigAtom) : get(rhythmConfigFamily(rhythmId))
  },
  set: ({ set, get }, newValue) => {
    const rhythmId = get(rhythmSelectAtom)
    if (rhythmId === null) {
      set(rhythmConfigAtom, newValue)
    } else {
      set(rhythmConfigFamily(rhythmId), newValue)
    }
  },
})

export const rhythmIdsAtom = atom<RhythmId[]>({
  key: 'rhythmIdsAtom',
  default: [],
})
