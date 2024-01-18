import { usePolyrhythmConfig } from '@/hooks/polyrhythm-config-hook'
import { SynthName } from '@/lib/instruments'
import React, { ChangeEvent, useEffect, useState } from 'react'

const synths: SynthName[] = ['beep', 'membrane', 'amsine']
const SynthController = () => {
  const polyrhythmConfig = usePolyrhythmConfig()
  const [index, setIndex] = useState<number>(() => {
    return synths.findIndex((synthName) => synthName === polyrhythmConfig.synthName)
  })

  const handleSynth = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setIndex(target.valueAsNumber)
  }

  useEffect(() => {
    polyrhythmConfig.synthName = synths[index]
  }, [index])

  return <SynthControllerUI onChange={handleSynth} index={index} />
}
export default SynthController

type SynthControllerUIProps = { index: number; onChange: (e: ChangeEvent<HTMLInputElement>) => void }
const SynthControllerUI = ({ index, onChange }: SynthControllerUIProps) => {
  return (
    <div className="SynthController">
      <section>
        <label htmlFor="synth">Synth : {synths[index]}</label>
        <input type="range" id="synth" min={0} max={synths.length - 1} onChange={onChange} value={index} />
      </section>
    </div>
  )
}
