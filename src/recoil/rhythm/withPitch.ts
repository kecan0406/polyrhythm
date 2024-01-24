import { DefaultValue, selector } from 'recoil'

import { rhythmWithSelect } from '@/recoil/rhythm/index'

const rhythmWithPitch = selector<number>({
  key: 'rhythmWithPitch',
  get: ({ get }) => get(rhythmWithSelect).pitch,
  set: ({ set, get }, pitch) => {
    const rhythm = get(rhythmWithSelect)
    set(rhythmWithSelect, {
      ...rhythm,
      pitch: pitch instanceof DefaultValue ? rhythm.pitch : pitch,
    })
  },
})

export default rhythmWithPitch
