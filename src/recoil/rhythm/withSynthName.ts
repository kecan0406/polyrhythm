import { SynthName } from '@/lib/instruments'
import { DefaultValue, selector } from 'recoil'
import rhythmConfigAtom from './atom'

const rhythmWithSynthName = selector<SynthName>({
  key: 'rhythmWithSynthName',
  get: ({ get }) => get(rhythmConfigAtom).synthName,
  set: ({ set, get }, newValue) => {
    const { ...rhythmConfig } = get(rhythmConfigAtom)
    set(rhythmConfigAtom, {
      ...rhythmConfig,
      synthName: newValue instanceof DefaultValue ? rhythmConfig.synthName : newValue,
    })
  },
})

export default rhythmWithSynthName
