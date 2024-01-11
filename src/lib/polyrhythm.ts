import { Synth } from 'tone'
import { Transport } from 'tone/build/esm/core/clock/Transport'
import { Note } from 'tone/build/esm/core/type/NoteUnits'
import { Decibels, Time } from 'tone/build/esm/core/type/Units'
import { PolyrhythmConfig } from '../hooks/polyrhythm-config-hook'
import { Point } from '../types/canvas-types'
import { getBeepSynth } from './instruments'

export class Rhythm {
  public readonly id: number

  public interval: number
  public position: Point
  public note: Note
  public beepSynth: Synth = getBeepSynth().toDestination()

  private transport: Transport

  constructor(id: number, { note, interval }: PolyrhythmConfig, position: Point, transport: Transport) {
    this.id = id
    this.note = note
    this.interval = interval
    this.position = position
    this.transport = transport
  }

  public toTicks(time: Time): number {
    return this.transport.toTicks(time)
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
}
