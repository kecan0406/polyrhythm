import { DefaultValue, selector } from 'recoil'
import { NoteSymbol, rhythmConfigWithSelect } from './atom'

const rhythmWithNoteSymbol = selector<NoteSymbol>({
  key: 'rhythmWithNoteSymbol',
  get: ({ get }) => get(rhythmConfigWithSelect).noteSymbol,
  set: ({ set, get }, noteSymbol) => {
    const rhythmConfig = get(rhythmConfigWithSelect)
    set(rhythmConfigWithSelect, {
      ...rhythmConfig,
      noteSymbol: noteSymbol instanceof DefaultValue ? rhythmConfig.noteSymbol : noteSymbol,
    })
  },
})
export default rhythmWithNoteSymbol
