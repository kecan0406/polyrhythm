import { Synth } from 'tone'
import { Note } from 'tone/build/esm/core/type/NoteUnits'
import { Decibels } from 'tone/build/esm/core/type/Units'
import { Point } from '../types/canvas-types'
import { getBeepSynth } from './instruments'

export class Rhythm {
  public readonly id: number

  public interval: number
  public position: Point
  public note: Note
  public beepSynth: Synth = getBeepSynth().toDestination()

  constructor(id: number, note: Note, interval: number, position: Point) {
    this.id = id
    this.note = note
    this.interval = interval
    this.position = position
  }

  public getVolume(): Decibels {
    return Math.round(this.beepSynth.volume.value)
  }

  public setVolume(volume: Decibels) {
    this.beepSynth.volume.value = volume
  }
}
