import { getTransport } from 'tone'
import { Transport } from 'tone/build/esm/core/clock/Transport'
import { Note } from 'tone/build/esm/core/type/NoteUnits'
import { Time } from 'tone/build/esm/core/type/Units'
import { Point } from '../types/canvas-types'
import { getBeepSynth } from './instruments'

export class Rhythm {
  public readonly id: number
  public readonly note: Note
  public readonly interval: Time
  public readonly position: Point

  private readonly transport: Transport = getTransport()

  constructor(note: Note, interval: Time, position: Point) {
    this.note = note
    this.interval = interval
    this.position = position
    this.id = this.playRepeat()
  }

  private playRepeat() {
    const beepSynth = getBeepSynth().toDestination()
    return this.transport.scheduleRepeat((time) => {
      beepSynth.triggerAttackRelease(this.note, time, 0.05)
    }, this.interval)
  }

  public clearRepeat() {
    this.transport.clear(this.id)
  }
}
