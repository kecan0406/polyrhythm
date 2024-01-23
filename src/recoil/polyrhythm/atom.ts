import { Rhythm } from '@/lib/polyrhythm'
import { atom } from 'recoil'

const polyrhythmAtom = atom<Rhythm[]>({
  key: 'polyrhythmAtom',
  default: [],
  dangerouslyAllowMutability: true,
})

export default polyrhythmAtom
