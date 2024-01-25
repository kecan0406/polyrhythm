import rhythmAtom, { rhythmAtomFamily, selectRhythmIdAtom } from '@/recoil/rhythm/atom'
import { selector } from 'recoil'

const rhythmWithSelect = selector({
  key: 'rhythmWithSelect',
  get: ({ get }) => {
    const rhythmId = get(selectRhythmIdAtom)
    return rhythmId ? get(rhythmAtomFamily(rhythmId)) : get(rhythmAtom)
  },
  set: ({ set, get }, newValue) => {
    const rhythmId = get(selectRhythmIdAtom)
    set(rhythmId ? rhythmAtomFamily(rhythmId) : rhythmAtom, newValue)
  },
})
export default rhythmWithSelect
