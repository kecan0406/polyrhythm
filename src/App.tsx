import React, { useState } from 'react'
import { PolyrhythmGenerator } from './lib/polyrhythm'
import { PolyrhythmNote, polyrhythmNotes } from './lib/sample'
function App() {
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const polyrhythmGenerator = new PolyrhythmGenerator()

  const executePolyrhythm = async (polyrhythmNote: PolyrhythmNote) => {
    if (isClicked) {
      polyrhythmGenerator.generateSynth(polyrhythmNote)
    } else {
      setIsClicked(true)
      await polyrhythmGenerator.readyPolyrhythm()
      polyrhythmGenerator.generateSynth(polyrhythmNote)
    }
  }
  return (
    <div>
      {polyrhythmNotes.map((polyrhythmNote) => (
        <button
          key={polyrhythmNote.note}
          onClick={() => executePolyrhythm(polyrhythmNote)}
        >
          {polyrhythmNote.note}
        </button>
      ))}
    </div>
  )
}

export default App
