import { rhythmWithSelect } from '@/recoil/rhythm/index'
import { DefaultValue, selector } from 'recoil'

import { NoteSymbol } from '@/types/rhythm-types'

const rhythmWithNoteSymbol = selector<NoteSymbol>({
  key: 'rhythmWithNoteSymbol',
  get: ({ get }) => get(rhythmWithSelect).noteSymbol,
  set: ({ set, get }, noteSymbol) => {
    const rhythm = get(rhythmWithSelect)
    set(rhythmWithSelect, {
      ...rhythm,
      noteSymbol: noteSymbol instanceof DefaultValue ? rhythm.noteSymbol : noteSymbol,
    })
  },
})
export default rhythmWithNoteSymbol
