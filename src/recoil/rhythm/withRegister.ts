import { rhythmAtomFamily, rhythmIdsAtom } from '@/recoil/rhythm/atom'
import { asc } from '@/utils/math-util'
import { DefaultValue, selector } from 'recoil'

const rhythmWithRegister = selector({
  key: 'rhythmWithRegister',
  get: ({ get }) => rhythmAtomFamily(getNextId(get(rhythmIdsAtom))),
  set: ({ set, get }, rhythm) => {
    if (rhythm instanceof DefaultValue) return
    const rhythmId = getNextId(get(rhythmIdsAtom))
    set(rhythmAtomFamily(rhythmId), { ...rhythm, isActive: true })
    set(rhythmIdsAtom, (prev) => [...prev, rhythmId])
  },
})
export default rhythmWithRegister

const getNextId = (ids: number[]) => {
  const sortedIds = ids.toSorted(asc)
  if (sortedIds.at(0) !== 1) return 1
  const missingId = sortedIds.find((id, i) => sortedIds[i + 1] - id > 1)
  return (missingId ?? sortedIds.at(-1) ?? 0) + 1
}
