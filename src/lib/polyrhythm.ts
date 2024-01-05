import { getTransport, Synth } from 'tone'
import { Transport } from 'tone/build/esm/core/clock/Transport'
import { Note } from 'tone/build/esm/core/type/NoteUnits'
import { Decibels, Time } from 'tone/build/esm/core/type/Units'
import { Point } from '../types/canvas-types'
import { getBeepSynth } from './instruments'

export class Rhythm {
  public readonly id: number
  public position: Point

  private readonly transport: Transport = getTransport()
  private readonly beepSynth: Synth = getBeepSynth().toDestination()
  private note: Note
  private interval: Time
  private scheduleId: number

  constructor(id: number, note: Note, interval: Time, position: Point) {
    this.id = id
    this.note = note
    this.interval = interval
    this.position = position
    this.scheduleId = this.playRepeat()
  }

  public playRepeat() {
    const beepSynth = this.beepSynth
    return this.transport.scheduleRepeat((time) => {
      beepSynth.triggerAttackRelease(this.note, time, 0.05)
    }, this.interval)
  }

  public resetRepeat() {
    this.clearRepeat()
    this.scheduleId = this.playRepeat()
  }

  public clearRepeat() {
    this.transport.clear(this.scheduleId)
  }

  public getVolume(): Decibels {
    return Math.round(this.beepSynth.volume.value)
  }

  public setVolume(volume: Decibels) {
    this.beepSynth.volume.value = volume
  }

  public getNote(): Note {
    return this.note
  }

  public setNote(note: Note) {
    this.note = note
  }

  public getInterval(): Time {
    return this.interval
  }

  public setInterval(interval: Time) {
    this.interval = interval
  }
}
