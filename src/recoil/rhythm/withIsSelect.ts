import { rhythmWithSelect } from '@/recoil/rhythm/index'
import { DefaultValue, selector } from 'recoil'

const rhythmWithIsSelect = selector<boolean>({
  key: 'rhythmWithIsSelect',
  get: ({ get }) => get(rhythmWithSelect).isSelect,
  set: ({ set, get }, isSelect) => {
    const rhythm = get(rhythmWithSelect)
    set(rhythmWithSelect, {
      ...rhythm,
      isSelect: isSelect instanceof DefaultValue ? rhythm.isSelect : isSelect,
    })
  },
})

export default rhythmWithIsSelect
