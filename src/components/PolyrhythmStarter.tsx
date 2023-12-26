import React, { MouseEventHandler } from 'react'

type PolyrhythmStarterProps = { onClick: MouseEventHandler }
function PolyrhythmStarter({ onClick }: PolyrhythmStarterProps) {
  return <div className="Starter" onClick={onClick} />
}
export default PolyrhythmStarter
