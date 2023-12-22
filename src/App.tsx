import React from 'react'
import { executePolyrhythm } from './lib/polyrhythm'
function App() {
  return <button onClick={() => executePolyrhythm()}>click me!!</button>
}

export default App
