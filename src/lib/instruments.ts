import { NoteSymbol } from '@/recoil/config/atom'
import { AMSynth, InputNode, MembraneSynth, PolySynth, Synth, Volume } from 'tone'
import { Note } from 'tone/build/esm/core/type/NoteUnits'
import { Time } from 'tone/build/esm/core/type/Units'

export const getBeepSynth = (): PolySynth => {
  return new PolySynth(Synth).set({
    envelope: {
      attack: 0.02,
      decay: 0.3,
      sustain: 0,
      release: 0.2,
    },
  })
}
const getMembraneSynth = (): PolySynth => {
  return new PolySynth(MembraneSynth).set({
    envelope: {
      attack: 0.02,
      decay: 0.3,
      sustain: 0,
      release: 0.2,
    },
  })
}
const getAmsineSynth = (): PolySynth => {
  return new PolySynth(AMSynth).set({
    oscillator: { type: 'amsine' },
    detune: 0,
    envelope: {
      attack: 0.02,
      decay: 0.3,
      sustain: 0,
      release: 0.2,
    },
  })
}

export type SynthName = keyof typeof SYNTH
const SYNTH = { beep: () => getBeepSynth(), membrane: () => getMembraneSynth(), amsine: () => getAmsineSynth() }

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
    return SYNTH[this.synthName]().connect(this.volume)
  }

  public trigger(noteSymbol: NoteSymbol, pitch: number, duration: Time, time?: Time) {
    const note = `${noteSymbol}${pitch}` as Note
    this.synth.triggerAttackRelease(note, duration, time)
  }

  public getVolume() {
    return Math.round(this.volume.volume.value)
  }

  public setVolume(volume: number) {
    this.volume.volume.value = volume
  }

  public dispose() {
    this.volume.dispose()
    setTimeout(() => this.synth.dispose(), 1000)
  }
}
