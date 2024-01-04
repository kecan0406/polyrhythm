import { getTransport, Synth } from 'tone'
import { Transport } from 'tone/build/esm/core/clock/Transport'
import { Note } from 'tone/build/esm/core/type/NoteUnits'
import { Decibels, Time } from 'tone/build/esm/core/type/Units'
import { Point } from '../types/canvas-types'
import { getBeepSynth } from './instruments'

export class Rhythm {
  public readonly id: number
  public readonly note: Note
  public readonly interval: Time
  public readonly position: Point

  private readonly transport: Transport = getTransport()
  private readonly synth: Synth = getBeepSynth()

  constructor(note: Note, interval: Time, position: Point) {
    this.note = note
    this.interval = interval
    this.position = position
    this.id = this.playRepeat()
  }

  private playRepeat() {
    const beepSynth = this.synth.toDestination()
    return this.transport.scheduleRepeat((time) => {
      beepSynth.triggerAttackRelease(this.note, time, 0.05)
    }, this.interval)
  }

  public clearRepeat() {
    this.transport.clear(this.id)
  }

  public setVolume(volume: Decibels) {
    this.synth.volume.value = volume
  }

  public getVolume(): Decibels {
    return this.synth.volume.value
  }
}
