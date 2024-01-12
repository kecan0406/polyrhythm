import React, { ChangeEvent, useEffect, useState } from 'react'
import { SynthName } from '../../../../lib/instruments'
import { Rhythm } from '../../../../lib/polyrhythm'

const synths: SynthName[] = ['beep', 'membrane']
type RhythmSynthControllerProps = { rhythm: Rhythm }
const RhythmSynthController = ({ rhythm }: RhythmSynthControllerProps) => {
  const [index, setIndex] = useState<number>(() => {
    return synths.findIndex((synthName) => synthName === rhythm.instrument.synthName)
  })

  useEffect(() => {
    setIndex(synths.findIndex((synthName) => synthName === rhythm.instrument.synthName))
  }, [index])

  const handleSynth = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const index = target.valueAsNumber
    setIndex(index)
    rhythm.instrument.changeSynth(synths[index])
    rhythm.reset()
  }

  return <RhythmSynthControllerUI onChange={handleSynth} index={index} />
}
export default RhythmSynthController

type RhythmSynthControllerUIProps = { index: number; onChange: (e: ChangeEvent<HTMLInputElement>) => void }
const RhythmSynthControllerUI = ({ index, onChange }: RhythmSynthControllerUIProps) => {
  return (
    <div className="SynthController">
      <section>
        <label htmlFor="synth">Synth : {synths[index]}</label>
        <input type="range" id="synth" min={0} max={synths.length - 1} onChange={onChange} value={index} />
      </section>
    </div>
  )
}
