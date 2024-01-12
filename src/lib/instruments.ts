import { MembraneSynth, Synth, Volume } from 'tone'
import { Note } from 'tone/build/esm/core/type/NoteUnits'
import { Time } from 'tone/build/esm/core/type/Units'

export const getBeepSynth = (): Synth => {
  return new Synth({
    envelope: {
      attack: 0.01,
      decay: 0,
      sustain: 1,
      release: 0.01,
    },
  })
}
const getMembraneSynth = (): Synth => {
  return new MembraneSynth()
}

export type SynthName = keyof typeof SYNTH
const SYNTH = { beep: () => getBeepSynth(), membrane: () => getMembraneSynth() }

export class Instruments {
  public synthName: SynthName

  private synth: Synth
  private readonly volume: Volume = new Volume().toDestination()

  constructor(synthName: SynthName) {
    this.synthName = synthName
    this.synth = this.setSynth(synthName)
  }

  public changeSynth(synthName: SynthName) {
    this.synth.dispose()
    this.synth = this.setSynth(synthName)
  }

  private setSynth(synthName: SynthName): Synth {
    this.synthName = synthName
    return SYNTH[this.synthName]().connect(this.volume)
  }

  public trigger(note: Note, duration: Time, time: Time) {
    this.synth.triggerAttackRelease(note, duration, time)
  }

  public getVolume() {
    return Math.round(this.volume.volume.value)
  }

  public setVolume(volume: number) {
    this.volume.volume.value = volume
  }

  public dispose() {
    this.synth.dispose()
    this.volume.dispose()
  }
}
