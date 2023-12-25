import { start as toneStart, Transport, Volume } from 'tone'
import { getBeepSynth } from './instruments'
import { PolyrhythmNote } from './sample'

export class PolyrhythmGenerator {
  private volume = new Volume(-20).toDestination()
  private ids: number[] = []

  public async readyPolyrhythm() {
    await toneStart()
    Transport.start(0)
  }

  public generateSynth(polyrhythmNote: PolyrhythmNote) {
    const beepSynth = getBeepSynth().connect(this.volume)
    const id = Transport.scheduleRepeat(
      (time) => {
        beepSynth.triggerAttackRelease(polyrhythmNote.note, time, 0.05)
      },
      polyrhythmNote.interval,
      '+1m',
      '+1m',
    )
    this.ids.push(id)
  }
}
