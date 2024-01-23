import { SynthName } from '@/lib/instruments'
import { atom } from 'recoil'

export type NoteSymbol = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B' | 'B#' | 'C#' | 'D#' | 'E#' | 'F#' | 'G#' | 'A#'

export type rhythmConfig = {
  interval: number
  synthName: SynthName
  noteSymbol: NoteSymbol
  pitch: number
}

const rhythmConfigAtom = atom<rhythmConfig>({
  key: 'rhythmConfigAtom',
  default: {
    interval: 3,
    synthName: 'beep',
    noteSymbol: 'C',
    pitch: 5,
  },
})

export default rhythmConfigAtom
