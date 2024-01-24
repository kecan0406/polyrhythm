import { Rhythm, rhythmAtomFamily, rhythmIdsAtom } from '@/recoil/rhythm/atom'
import { selector } from 'recoil'

const rhythmWithList = selector<Rhythm[]>({
  key: 'rhythmWithList',
  get: ({ get }) => {
    const rhythms = get(rhythmIdsAtom)
    return rhythms.map((id) => get(rhythmAtomFamily(id)))
  },
})

export default rhythmWithList
