import { Synth } from 'tone'

export const getBeepSynth = () => {
  return new Synth({
    envelope: {
      attack: 0.01,
      decay: 0,
      sustain: 1,
      release: 0.01,
    },
  })
}
