import { getTransport, Synth } from 'tone'
import { Transport } from 'tone/build/esm/core/clock/Transport'
import { Note } from 'tone/build/esm/core/type/NoteUnits'
import { PolyrhythmConfig } from '../hooks/polyrhythm-config-hook'
import { Point } from '../types/canvas-types'
import { getBeepSynth } from './instruments'
import { QUARTER_NOTE } from './utils/math-util'

export class Rhythm {
  public readonly id: number

  public interval: number
  public position: Point
  public note: Note
  public beepSynth: Synth = getBeepSynth().toDestination()
  public transport: Transport = getTransport()

  private scheduleId: number

  constructor(id: number, { note, interval }: PolyrhythmConfig, position: Point) {
    this.id = id
    this.note = note
    this.interval = interval
    this.position = position
    this.scheduleId = this.scheduleRepeat()
  }

  public reset() {
    this.transport.clear(this.scheduleId)
    this.scheduleId = this.scheduleRepeat()
  }

  public dispose() {
    this.transport.clear(this.scheduleId)
    this.beepSynth.dispose()
  }

  private scheduleRepeat() {
    return this.transport.scheduleRepeat(
      (time) => {
        this.beepSynth.triggerAttackRelease(this.note, time, 0.005)
      },
      `${Math.round(QUARTER_NOTE / this.interval)}i`,
      0,
    )
  }
}
