import { DefaultValue, selector } from 'recoil'
import { rhythmConfigWithSelect } from './atom'

const rhythmWithInterval = selector<number>({
  key: 'rhythmWithInterval',
  get: ({ get }) => get(rhythmConfigWithSelect).interval,
  set: ({ set, get }, interval) => {
    const rhythmConfig = get(rhythmConfigWithSelect)
    set(rhythmConfigWithSelect, {
      ...rhythmConfig,
      interval: interval instanceof DefaultValue ? rhythmConfig.interval : interval,
    })
  },
})
export default rhythmWithInterval
