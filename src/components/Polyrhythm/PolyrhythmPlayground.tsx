import React, { RefObject, useRef } from 'react'
import { useCanvas, useClientWidthHeight } from '../../hooks/canvas-hook'
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
  const canvasRef = useCanvas(canvasSize)
  return <canvas className="Visualization" ref={canvasRef} onContextMenu={(e) => e.preventDefault()} />
}
