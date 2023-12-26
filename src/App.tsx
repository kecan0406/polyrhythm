import React, { useState } from 'react'
import './App.scss'
import Polyrhythm from './components/Polyrhythm'
import Starter from './components/Starter'

function App() {
  const [isShow, setIsShow] = useState(false)

  const handleIsShow = () => setIsShow(true)

  return (
    <div className="Main">
      {isShow ? <Polyrhythm /> : <Starter onClick={handleIsShow} />}
    </div>
  )
}

export default App
