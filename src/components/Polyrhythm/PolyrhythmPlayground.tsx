import React, { RefObject, useRef } from 'react'
import { useCanvas, useClientWidthHeight } from '../../hooks/canvas-hook'
import { usePolyrhythmActions } from '../../hooks/polyrhythm-hook'
import { useAnimate, useVisualization } from '../../hooks/visualization-hook'
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
  const visualization = useVisualization()
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
