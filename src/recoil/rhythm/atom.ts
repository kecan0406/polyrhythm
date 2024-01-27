import { SynthName } from '@/lib/instruments'
import { Point } from '@/types/canvas-types'
import { NoteSymbol } from '@/types/rhythm-types'
import { atom, atomFamily, selector } from 'recoil'

export type Rhythm = {
  interval: number
  synthName: SynthName
  noteSymbol: NoteSymbol
  pitch: number
  point: Point
  isSelect: boolean
  isActive: boolean
}

export type RhythmId = number

export const selectRhythmIdAtom = atom<RhythmId>({
  key: 'selectRhythmIdAtom',
  default: 0,
})

export const rhythmIdsAtom = atom<RhythmId[]>({
  key: 'rhythmIdsAtom',
  default: [],
})

export const rhythmAtomFamily = atomFamily<Rhythm, RhythmId>({
  key: 'rhythmAtomFamily',
  default: selector({
    key: 'rhythmAtomFamily/default',
    get: ({ get }) => get(rhythmAtom),
  }),
})

const rhythmAtom = atom<Rhythm>({
  key: 'rhythmAtom',
  default: {
    interval: 3,
    synthName: 'beep',
    noteSymbol: 'C',
    pitch: 5,
    point: { x: 0, y: 0 },
    isSelect: false,
    isActive: false,
  },
})

export default rhythmAtom
