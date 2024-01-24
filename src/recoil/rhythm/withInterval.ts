import { DefaultValue, selector } from 'recoil'

import { rhythmWithSelect } from '@/recoil/rhythm/index'

const rhythmWithInterval = selector<number>({
  key: 'rhythmWithInterval',
  get: ({ get }) => get(rhythmWithSelect).interval,
  set: ({ set, get }, interval) => {
    const rhythm = get(rhythmWithSelect)
    set(rhythmWithSelect, {
      ...rhythm,
      interval: interval instanceof DefaultValue ? rhythm.interval : interval,
    })
  },
})
export default rhythmWithInterval
