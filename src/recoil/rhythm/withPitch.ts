import { DefaultValue, selector } from 'recoil'
import { rhythmConfigWithSelect } from './atom'

const rhythmWithPitch = selector<number>({
  key: 'rhythmWithPitch',
  get: ({ get }) => get(rhythmConfigWithSelect).pitch,
  set: ({ set, get }, pitch) => {
    const rhythmConfig = get(rhythmConfigWithSelect)
    set(rhythmConfigWithSelect, {
      ...rhythmConfig,
      pitch: pitch instanceof DefaultValue ? rhythmConfig.pitch : pitch,
    })
  },
})

export default rhythmWithPitch
