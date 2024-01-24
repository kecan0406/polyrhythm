import { rhythmWithInterval, rhythmWithNoteSymbol, rhythmWithPitch, rhythmWithSynthName } from '@/recoil/rhythm'
import { useRecoilValue } from 'recoil'

export const useRhythmValue = () => {
  const interval = useRecoilValue(rhythmWithInterval)
  const noteSymbol = useRecoilValue(rhythmWithNoteSymbol)
  const pitch = useRecoilValue(rhythmWithPitch)
  const synthName = useRecoilValue(rhythmWithSynthName)

  return { interval, noteSymbol, pitch, synthName }
}
