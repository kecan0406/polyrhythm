import { rhythmAtomFamily, rhythmIdsAtom, selectRhythmIdAtom } from '@/recoil/rhythm/atom'
import { DefaultValue, selector } from 'recoil'

const rhythmWithDeregister = selector({
  key: 'rhythmWithDeregister',
  get: ({ get }) => get(rhythmIdsAtom).at(-1) ?? null,
  set: ({ set, reset }, selectRhythmId) => {
    if (selectRhythmId instanceof DefaultValue || selectRhythmId === null) return

    reset(rhythmAtomFamily(selectRhythmId))
    set(rhythmIdsAtom, (prev) => prev.filter((id) => id !== selectRhythmId))
    set(selectRhythmIdAtom, null)
  },
})
export default rhythmWithDeregister
