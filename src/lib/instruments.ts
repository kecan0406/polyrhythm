import { AMSynth, InputNode, MembraneSynth, PolySynth, Synth, Volume } from 'tone'
import { Frequency, Time } from 'tone/build/esm/core/type/Units'

export type SynthName = keyof typeof SYNTH
const SYNTH = {
  beep: {
    get: () =>
      new PolySynth(Synth).set({
        envelope: {
          attack: 0.02,
          decay: 0.3,
          sustain: 0,
          release: 0.2,
        },
      }),
    pitch: [1, 2, 3, 4],
  },
  tryAmSynth: {
    get: () => new PolySynth(AMSynth).set({ oscillator: { type: 'triangle' } }),
  },
  membrane: {
    get: () =>
      new PolySynth(MembraneSynth).set({
        envelope: {
          attack: 0.02,
          decay: 0.3,
          sustain: 0,
          release: 0.2,
        },
      }),
    pitch: [1, 2],
  },
  amsine: {
    get: () =>
      new PolySynth(AMSynth).set({
        oscillator: { type: 'amsine' },
        detune: 0,
        envelope: {
          attack: 0.02,
          decay: 0.3,
          sustain: 0,
          release: 0.2,
        },
      }),
    pitch: [3, 4],
  },
}

export class Instruments {
  public synthName: SynthName

  private synth: PolySynth
  private readonly volume: Volume = new Volume()

  constructor(synthName: SynthName) {
    this.synthName = synthName
    this.synth = this.setSynth(synthName)
  }

  public connect(destination: InputNode): this {
    this.volume.connect(destination)
    return this
  }

  public changeSynth(synthName: SynthName) {
    this.synth.dispose()
    this.synth = this.setSynth(synthName)
  }

  private setSynth(synthName: SynthName): PolySynth {
    this.synthName = synthName
    return SYNTH[this.synthName].get().connect(this.volume)
  }

  public trigger(note: Frequency, duration: Time, time?: Time) {
    this.synth.triggerAttackRelease(note, duration, time)
  }

  public dispose() {
    const safeDispose = setTimeout(
      () => {
        this.volume.dispose()
        this.synth.dispose()
        clearTimeout(safeDispose)
      },
      this.synth.toSeconds('1m') * 1000,
    )
  }
}
