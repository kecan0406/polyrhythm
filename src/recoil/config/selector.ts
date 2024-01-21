import { rhythmConfigState } from '@/recoil/config/atom'
import { selector } from 'recoil'

export const rhythmConfigSynthNameState = selector({
  key: 'rhythmConfigSynthName',
  get: ({ get }) => {
    const { synthName } = get(rhythmConfigState)
    return synthName
  },
})

export const rhythmConfigPitchState = selector({
  key: 'rhythmConfigPitch',
  get: ({ get }) => {
    const { pitch } = get(rhythmConfigState)
    return pitch
  },
})

export const rhythmConfigNoteSymbolState = selector({
  key: 'rhythmConfigNoteSymbol',
  get: ({ get }) => {
    const { noteSymbol } = get(rhythmConfigState)
    return noteSymbol
  },
})
