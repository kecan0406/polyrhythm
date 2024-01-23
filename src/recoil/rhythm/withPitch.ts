import { DefaultValue, selector } from 'recoil'
import rhythmConfigAtom from './atom'

const rhythmWithPitch = selector<number>({
  key: 'rhythmWithPitch',
  get: ({ get }) => get(rhythmConfigAtom).pitch,
  set: ({ set, get }, newValue) => {
    const { ...rhythmConfig } = get(rhythmConfigAtom)
    set(rhythmConfigAtom, {
      ...rhythmConfig,
      pitch: newValue instanceof DefaultValue ? rhythmConfig.pitch : newValue,
    })
  },
})

export default rhythmWithPitch
