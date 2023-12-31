import * as Tone from 'tone'
import { Volume } from 'tone'
import { Transport } from 'tone/build/esm/core/clock/Transport'

export class Polyrhythm {
  private readonly volume: Volume
  private readonly transport: Transport

  constructor() {
    Tone.setContext(new Tone.Context({ latencyHint: 'interactive' }))
    this.volume = new Tone.Volume(-20).toDestination()
    this.transport = Tone.getTransport()
    Tone.start().then(() => {
      this.transport.start(0)
      this.drawAnimate()
    })
  }

  private drawAnimate() {
    this.transport.schedule((time) => {
      Tone.Draw.schedule(() => {
        console.log(time)
      }, time)
    }, '+0.5')
  }
}
