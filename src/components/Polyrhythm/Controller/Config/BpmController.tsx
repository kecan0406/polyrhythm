import React, { useEffect, useState } from 'react'
import { getTransport } from 'tone'

const BpmController = () => {
  const [bpm, setBpm] = useState<number>(120)

  const handleBpm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBpm(Math.round(e.target.valueAsNumber))
  }

  useEffect(() => {
    const transport = getTransport()
    transport.bpm.value = bpm
  }, [bpm])

  return <BpmControllerUI bpm={bpm} onChange={handleBpm} />
}
export default BpmController

type BpmControllerUIProps = { bpm: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }
const BpmControllerUI = ({ bpm, onChange }: BpmControllerUIProps) => {
  return (
    <div className="BpmController">
      <section>
        <label htmlFor="bpm">BPM : {bpm}</label>
        <input type="range" id="bpm" min={60} max={200} onChange={onChange} value={bpm} />
      </section>
    </div>
  )
}
