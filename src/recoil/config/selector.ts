import { rhythmConfigState } from '@/recoil/config/atom'
import { selector } from 'recoil'

export const rhythmConfigSynthNameState = selector({
  key: 'rhythmConfigSynthName',
  get: ({ get }) => {
    const { synthName } = get(rhythmConfigState)
    return synthName
  },
})

export const rhythmConfigNoteState = selector({
  key: 'rhythmConfigNote',
  get: ({ get }) => {
    const { note } = get(rhythmConfigState)
    return note
  },
})
