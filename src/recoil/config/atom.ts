import { SynthName } from '@/lib/instruments'
import { atom } from 'recoil'
import { Note } from 'tone/build/esm/core/type/NoteUnits'

export type rhythmConfig = {
  interval: number
  synthName: SynthName
  note: Note
}
export const rhythmConfigState = atom<rhythmConfig>({
  key: 'rhythmConfig',
  default: {
    interval: 3,
    synthName: 'beep',
    note: 'C5',
  },
})
