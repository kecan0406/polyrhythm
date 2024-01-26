import { TWELVE_TONE_COLORS } from '@/constants/chromesthesia'
import { NoteSymbol } from '@/types/rhythm-types'
import { RGB_OPACITY_REGEX } from '@/utils/math-util'

export const getTwelveToneRGBA = (noteSymbol: NoteSymbol, opacity: number): string =>
  TWELVE_TONE_COLORS[noteSymbol].replace(RGB_OPACITY_REGEX, `${opacity}`)
