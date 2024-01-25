import { rhythmWithSelect } from '@/recoil/rhythm/index'
import { DefaultValue, selector } from 'recoil'

const rhythmWithSelected = selector<boolean>({
  key: 'rhythmWithSelected',
  get: ({ get }) => get(rhythmWithSelect).selected,
  set: ({ set, get }, selected) => {
    const rhythm = get(rhythmWithSelect)
    set(rhythmWithSelect, {
      ...rhythm,
      selected: selected instanceof DefaultValue ? rhythm.selected : selected,
    })
  },
})

export default rhythmWithSelected
