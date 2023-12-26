import * as Tone from 'tone'
import { Volume } from 'tone'
import { Transport } from 'tone/build/esm/core/clock/Transport'
import { getBeepSynth } from './instruments'
import { PolyrhythmNote, polyrhythmNotes } from './sample'

export class PolyrhythmGenerator {
  private readonly volume: Volume
  private readonly transport: Transport
  private readonly polyrhythmNotes: PolyrhythmNote[] = polyrhythmNotes
  private ids: number[] = []
  constructor() {
    Tone.setContext(new Tone.Context({ latencyHint: 'interactive' }))
    this.volume = new Tone.Volume(-20).toDestination()
    this.transport = Tone.getTransport()
    Tone.start().then(() => this.transport.start(0))
  }

  public generateRandomSynth() {
    const polyrhythmNote = this.getRandomPolyrhythmNote()
    const beepSynth = getBeepSynth().connect(this.volume)
    const startTime = Math.ceil(this.transport.now())
    const id = this.transport.scheduleRepeat(
      (time) => beepSynth.triggerAttackRelease(polyrhythmNote.note, time, 0.05),
      polyrhythmNote.interval,
      startTime,
    )
    this.ids.push(id)
  }

  private getRandomPolyrhythmNote() {
    const randomNumber = Math.floor(Math.random() * this.polyrhythmNotes.length)
    return this.polyrhythmNotes[randomNumber]
  }

  public clearSynth() {
    const id = this.ids.pop()
    id !== undefined && this.transport.clear(id)
  }
}
