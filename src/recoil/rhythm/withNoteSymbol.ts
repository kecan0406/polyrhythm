import { rhythmWithSelect } from '@/recoil/rhythm/index'
import { NoteSymbol } from '@/types/rhythm-types'
import { DefaultValue, selector } from 'recoil'

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
