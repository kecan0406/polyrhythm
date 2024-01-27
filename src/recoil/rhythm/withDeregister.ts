import { rhythmAtomFamily, rhythmIdsAtom, selectRhythmIdAtom } from '@/recoil/rhythm/atom'
import { DefaultValue, selector } from 'recoil'

const rhythmWithDeregister = selector({
  key: 'rhythmWithDeregister',
  get: ({ get }) => get(rhythmIdsAtom).at(-1) ?? 0,
  set: ({ set, get, reset }, rhythmId) => {
    const targetId = rhythmId ? rhythmId : get(rhythmIdsAtom).at(-1)
    if (!targetId || targetId instanceof DefaultValue) return

    reset(rhythmAtomFamily(targetId))
    set(rhythmIdsAtom, (prev) => prev.filter((id) => id !== targetId))
    set(selectRhythmIdAtom, 0)
  },
})
export default rhythmWithDeregister
