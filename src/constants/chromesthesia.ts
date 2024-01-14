import { Note } from 'tone/build/esm/core/type/NoteUnits'

type NoteColor = { [key in Note]: string }
export const TWELVE_TONE_COLORS = {
  C5: 'rgb(255,0,0,1)',
  'C#5': 'rgb(128,0,0,1)',
  D5: 'rgb(255,96,160,1)',
  'D#5': 'rgb(255,253,55,1)',
  E5: 'rgb(0,255,89,1)',
  F5: 'rgb(0,213,255,1)',
  'F#5': 'rgb(128,128,128,1)',
  G5: 'rgb(0,0,255,1)',
  Ab5: 'rgb(255,112,0,1)',
  A5: 'rgb(0,112,0,1)',
  Bb5: 'rgb(156,92,2,1)',
  B5: 'rgb(160,0,255,1)',
} as NoteColor
