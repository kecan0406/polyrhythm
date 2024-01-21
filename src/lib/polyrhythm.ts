import { NoteSymbol, rhythmConfig } from '@/recoil/config/atom'
import { Point } from '@/types/canvas-types'
import { QUARTER_NOTE } from '@/utils/math-util'
import { getTransport } from 'tone'
import { Transport } from 'tone/build/esm/core/clock/Transport'
import { Instruments } from './instruments'

export class Rhythm {
  public readonly id: number

  public interval: number
  public position: Point
  public noteSymbol: NoteSymbol
  public pitch: number
  public instrument: Instruments
  public transport: Transport = getTransport()

  private scheduleId: number

  constructor(id: number, { synthName, noteSymbol, pitch, interval }: rhythmConfig, position: Point) {
    this.id = id
    this.noteSymbol = noteSymbol
    this.pitch = pitch
    this.interval = interval
    this.position = position
    this.instrument = new Instruments(synthName)
    this.scheduleId = this.scheduleRepeat()
  }

  public reset() {
    this.transport.clear(this.scheduleId)
    this.scheduleId = this.scheduleRepeat()
  }

  public dispose() {
    this.transport.clear(this.scheduleId)
    this.instrument.dispose()
  }

  private scheduleRepeat() {
    return this.transport.scheduleRepeat(
      (time) => this.instrument.trigger(this.noteSymbol, this.pitch, '8n', time),
      `${Math.round(QUARTER_NOTE / this.interval)}i`,
      0,
    )
  }
}
