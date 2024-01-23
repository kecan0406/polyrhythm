import { rhythmConfig } from '@/recoil/config/atom'
import { Point } from '@/types/canvas-types'
import { QUARTER_NOTE } from '@/utils/math-util'
import { getTransport } from 'tone'
import { Transport } from 'tone/build/esm/core/clock/Transport'
import { Instruments } from './instruments'

export class Rhythm {
  public readonly id: number

  public position: Point
  public instrument: Instruments
  public transport: Transport = getTransport()
  public config: rhythmConfig

  private scheduleId: number

  constructor(id: number, { ...rhythmConfig }: rhythmConfig, position: Point) {
    this.id = id
    this.config = rhythmConfig
    this.position = position
    this.instrument = new Instruments(this.config.synthName)
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
      (time) => this.instrument.trigger(this.config.noteSymbol, this.config.pitch, '8n', time),
      `${Math.round(QUARTER_NOTE / this.config.interval)}i`,
      0,
    )
  }
}
