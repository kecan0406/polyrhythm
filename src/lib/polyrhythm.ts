import { getTransport, Synth } from 'tone'
import { Transport } from 'tone/build/esm/core/clock/Transport'
import { Note } from 'tone/build/esm/core/type/NoteUnits'
import { PolyrhythmConfig } from '../hooks/polyrhythm-config-hook'
import { Point } from '../types/canvas-types'
import { getBeepSynth } from './instruments'

export class Rhythm {
  public readonly id: number

  public interval: number
  public position: Point
  public note: Note
  public beepSynth: Synth = getBeepSynth().toDestination()
  public transport: Transport = getTransport()

  constructor(id: number, { note, interval }: PolyrhythmConfig, position: Point) {
    this.id = id
    this.note = note
    this.interval = interval
    this.position = position
  }
}
