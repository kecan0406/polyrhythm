import { Pattern, Synth, Transport } from 'tone'

export const scheduler = () => {
  const synth = new Synth({
    envelope: {
      attack: 0.01,
      decay: 0,
      sustain: 1,
      release: 0.01,
    },
  }).toDestination()
  const pattern = new Pattern(
    (time, note) => {
      synth.triggerAttackRelease(note, time, 0.05)
    },
    ['C5'],
  )

  //['C6', 'G5', 'C5']
  pattern.start(0)
  Transport.start(0)
}
