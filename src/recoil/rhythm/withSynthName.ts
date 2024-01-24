import { SynthName } from '@/lib/instruments'
import { DefaultValue, selector } from 'recoil'
import { rhythmConfigWithSelect } from './atom'

const rhythmWithSynthName = selector<SynthName>({
  key: 'rhythmWithSynthName',
  get: ({ get }) => get(rhythmConfigWithSelect).synthName,
  set: ({ set, get }, synthName) => {
    const rhythmConfig = get(rhythmConfigWithSelect)
    set(rhythmConfigWithSelect, {
      ...rhythmConfig,
      synthName: synthName instanceof DefaultValue ? rhythmConfig.synthName : synthName,
    })
  },
})

export default rhythmWithSynthName
