import { Frequency } from 'tone/Tone/core/type/Units'
import { Time } from 'tone/build/esm/core/type/Units'

export type PolyrhythmNote = { note: Frequency; interval: Time }
export const polyrhythmNotes: PolyrhythmNote[] = [
  { note: 'C6', interval: '2n' },
  { note: 'G5', interval: '3n' },
  { note: 'C5', interval: '4n' },
  { note: 'E5', interval: '5n' },
]
