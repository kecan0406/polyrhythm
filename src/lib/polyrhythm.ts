import { getTransport, Synth } from 'tone'
import { Transport } from 'tone/build/esm/core/clock/Transport'
import { Note } from 'tone/build/esm/core/type/NoteUnits'
import { Decibels } from 'tone/build/esm/core/type/Units'
import { Point } from '../types/canvas-types'
import { getBeepSynth } from './instruments'

export class Rhythm {
  public readonly id: number
  public interval: number
  public position: Point
  public note: Note

  private readonly transport: Transport = getTransport()
  private readonly beepSynth: Synth = getBeepSynth().toDestination()
  private scheduleId: number

  constructor(id: number, note: Note, interval: number, position: Point) {
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
    }, `${this.interval}n`)
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
}
