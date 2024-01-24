import rhythmAtom, { rhythmAtomFamily, selectRhythmIdAtom } from '@/recoil/rhythm/atom'
import { selector } from 'recoil'

const rhythmWithSelect = selector({
  key: 'rhythmWithSelect',
  get: ({ get }) => {
    const rhythmId = get(selectRhythmIdAtom)
    return rhythmId === null ? get(rhythmAtom) : get(rhythmAtomFamily(rhythmId))
  },
  set: ({ set, get }, newValue) => {
    const rhythmId = get(selectRhythmIdAtom)
    set(rhythmId === null ? rhythmAtom : rhythmAtomFamily(rhythmId), newValue)
  },
})
export default rhythmWithSelect
