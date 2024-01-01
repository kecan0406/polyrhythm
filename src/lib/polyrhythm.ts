import * as Tone from 'tone'
import { Volume } from 'tone'
import { Transport } from 'tone/build/esm/core/clock/Transport'
import { Draw } from 'tone/build/esm/core/util/Draw'

export class PolyrhythmManager {
  private readonly transport: Transport
  private readonly volume: Volume
  private readonly draw: Draw

  constructor() {
    Tone.setContext(new Tone.Context({ latencyHint: 'interactive' }))
    this.volume = new Tone.Volume(-20).toDestination()
    this.transport = Tone.getTransport()
    this.draw = Tone.getDraw()
    Tone.start().then(() => this.transport.start(0))
  }
}
