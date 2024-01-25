import { rhythmAtomFamily, rhythmIdsAtom, selectRhythmIdAtom } from '@/recoil/rhythm/atom'
import { DefaultValue, selector } from 'recoil'

const rhythmWithDeregister = selector({
  key: 'rhythmWithDeregister',
  get: ({ get }) => get(rhythmIdsAtom).at(-1) ?? null,
  set: ({ set, get, reset }, rhythmId) => {
    if (rhythmId instanceof DefaultValue) return
    const targetRhythmId = rhythmId ?? get(rhythmIdsAtom).at(-1) ?? 0

    reset(rhythmAtomFamily(targetRhythmId))
    set(rhythmIdsAtom, (prev) => prev.filter((id) => id !== targetRhythmId))
    set(selectRhythmIdAtom, null)
  },
})
export default rhythmWithDeregister
