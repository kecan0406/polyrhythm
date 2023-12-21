import React from 'react'
import { scheduler } from './lib/scheduler'
function App() {
  const soundOn = () => {
    scheduler()
  }
  return <button onClick={soundOn}>click me!!</button>
}

export default App
