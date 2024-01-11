import { Synth } from 'tone'
import { Note } from 'tone/build/esm/core/type/NoteUnits'
import { Decibels } from 'tone/build/esm/core/type/Units'
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

  constructor(id: number, { note, interval }: PolyrhythmConfig, position: Point) {
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

  public dispose() {
    this.beepSynth.dispose()
  }

  public getQuarterTick(): number {
    return Math.round(QUARTER_NOTE / this.interval)
  }
}
