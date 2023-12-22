import { start, Transport, Volume } from 'tone'
import { getBeepSynth } from './instruments'

export const executePolyrhythm = async () => {
  await start()
  const volume = new Volume(-20).toDestination()
  const beepSynthC6 = getBeepSynth().connect(volume)
  const beepSynthG5 = getBeepSynth().connect(volume)
  const beepSynthC5 = getBeepSynth().connect(volume)

  Transport.scheduleRepeat((time) => {
    beepSynthC6.triggerAttackRelease('C6', time, 0.05)
    console.log('C6', time)
  }, '4n')
  Transport.scheduleRepeat((time) => {
    beepSynthG5.triggerAttackRelease('G5', time, 0.05)
    console.log('G5', time)
  }, '5n')
  Transport.scheduleRepeat((time) => {
    beepSynthC5.triggerAttackRelease('C5', time, 0.05)
    console.log('C5', time)
  }, '6n')

  Transport.start('+0.1')
}
