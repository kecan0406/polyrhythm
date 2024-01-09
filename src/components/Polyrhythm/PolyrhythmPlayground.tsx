import React, { RefObject, useRef } from 'react'
import { useAnimate } from '../../hooks/animate-hook'
import { useCanvas, useClientWidthHeight, useVisualization } from '../../hooks/canvas-hook'
import { usePolyrhythmActions, usePolyrhythmValue } from '../../hooks/polyrhythm-hook'
import { useScheduler } from '../../hooks/scheduler-hook'
import { CanvasSize } from '../../types/canvas-types'

const PolyrhythmPlayground = () => {
  const mainRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
  const playgroundSize = useClientWidthHeight(mainRef)
  return (
    <div className="Playground" ref={mainRef}>
      <PolyrhythmCanvas canvasSize={playgroundSize} />
    </div>
  )
}
export default PolyrhythmPlayground

type PolyrhythmCanvasProps = { canvasSize: CanvasSize }
const PolyrhythmCanvas = ({ canvasSize }: PolyrhythmCanvasProps) => {
  const polyrhythmActions = usePolyrhythmActions()
  const polyrhythm = usePolyrhythmValue()
  const visualization = useVisualization(polyrhythm)
  useScheduler(polyrhythm)
  const animate = useAnimate(visualization)

  const handleRegister = (e: React.MouseEvent) => {
    polyrhythmActions.register({ x: e.clientX, y: e.clientY })
  }

  const handleDeregister = (e: React.MouseEvent) => {
    polyrhythmActions.deregister()
    e.preventDefault()
  }

  const canvasRef = useCanvas(canvasSize, animate)
  return <canvas className="Visualization" ref={canvasRef} onClick={handleRegister} onContextMenu={handleDeregister} />
}
