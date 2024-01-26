import {
  rhythmWithInterval,
  rhythmWithList,
  rhythmWithNoteSymbol,
  rhythmWithPitch,
  rhythmWithSynthName,
  selectRhythmIdAtom,
} from '@/recoil/rhythm'
import { useRecoilValue } from 'recoil'

export const useRhythmValue = () => {
  const rhythms = useRecoilValue(rhythmWithList)
  const interval = useRecoilValue(rhythmWithInterval)
  const noteSymbol = useRecoilValue(rhythmWithNoteSymbol)
  const pitch = useRecoilValue(rhythmWithPitch)
  const synthName = useRecoilValue(rhythmWithSynthName)
  const selectId = useRecoilValue(selectRhythmIdAtom)

  return { interval, noteSymbol, pitch, synthName, selectId, rhythms }
}
