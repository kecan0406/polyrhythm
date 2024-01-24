import { rhythmAtomFamily, rhythmIdsAtom } from '@/recoil/rhythm/atom'
import { selector } from 'recoil'

const rhythmWithRegister = selector({
  key: 'rhythmWithRegister',
  get: ({ get }) => rhythmAtomFamily(get(rhythmIdsAtom).length),
  set: ({ set, get }, rhythm) => {
    const rhythmId = get(rhythmIdsAtom).length
    set(rhythmAtomFamily(rhythmId), rhythm)
    set(rhythmIdsAtom, (prev) => [...prev, rhythmId])
  },
})
export default rhythmWithRegister
