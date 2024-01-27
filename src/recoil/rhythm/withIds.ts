import { rhythmIdsAtom } from '@/recoil/rhythm/atom'
import { selector } from 'recoil'

const rhythmWithIds = selector({
  key: 'rhythmWithIds',
  get: ({ get }) => {
    const rhythms = get(rhythmIdsAtom)
    return rhythms.filter((id) => id)
  },
})

export default rhythmWithIds
