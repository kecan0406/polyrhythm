import { DefaultValue, selector } from 'recoil'
import rhythmConfigAtom from './atom'

const rhythmWithInterval = selector<number>({
  key: 'rhythmWithInterval',
  get: ({ get }) => get(rhythmConfigAtom).interval,
  set: ({ set, get }, newValue) => {
    const { ...rhythmConfig } = get(rhythmConfigAtom)
    set(rhythmConfigAtom, {
      ...rhythmConfig,
      interval: newValue instanceof DefaultValue ? rhythmConfig.interval : newValue,
    })
  },
})
export default rhythmWithInterval
