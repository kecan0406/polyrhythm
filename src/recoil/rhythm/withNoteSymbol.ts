import { DefaultValue, selector } from 'recoil'
import rhythmConfigAtom, { NoteSymbol } from './atom'

const rhythmWithNoteSymbol = selector<NoteSymbol>({
  key: 'rhythmWithNoteSymbol',
  get: ({ get }) => get(rhythmConfigAtom).noteSymbol,
  set: ({ set, get }, newValue) => {
    const { ...rhythmConfig } = get(rhythmConfigAtom)
    set(rhythmConfigAtom, {
      ...rhythmConfig,
      noteSymbol: newValue instanceof DefaultValue ? rhythmConfig.noteSymbol : newValue,
    })
  },
})
export default rhythmWithNoteSymbol
