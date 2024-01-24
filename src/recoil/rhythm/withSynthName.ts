import { SynthName } from '@/lib/instruments'
import { rhythmWithSelect } from '@/recoil/rhythm/index'
import { DefaultValue, selector } from 'recoil'

const rhythmWithSynthName = selector<SynthName>({
  key: 'rhythmWithSynthName',
  get: ({ get }) => get(rhythmWithSelect).synthName,
  set: ({ set, get }, synthName) => {
    const rhythm = get(rhythmWithSelect)
    set(rhythmWithSelect, {
      ...rhythm,
      synthName: synthName instanceof DefaultValue ? rhythm.synthName : synthName,
    })
  },
})

export default rhythmWithSynthName
