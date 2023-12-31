import * as Tone from 'tone'
import { Volume } from 'tone'
import { Transport } from 'tone/build/esm/core/clock/Transport'

export class PolyrhythmManager {
  private readonly volume: Volume
  private readonly transport: Transport
  private repeatNum: number = 0

  constructor() {
    Tone.setContext(new Tone.Context({ latencyHint: 'interactive' }))
    this.volume = new Tone.Volume(-20).toDestination()
    this.transport = Tone.getTransport()
    Tone.start().then(() => this.transport.start(0))
  }

  public repeat() {
    this.repeatNum = this.transport.scheduleRepeat((time) => {
      console.log(time)
    }, '1')
  }

  public repeatCancel() {
    this.transport.cancel(this.repeatNum)
  }
}
