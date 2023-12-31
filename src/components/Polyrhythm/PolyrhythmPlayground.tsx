import React, { RefObject, useRef } from 'react'
import { useCanvas, useCanvasVisualization, useClientWidthHeight } from '../../hooks/canvas-hook'
import { CanvasSize } from '../../types/canvas-types'

const PolyrhythmPlayground = () => {
  const mainRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
  const canvasSize = useClientWidthHeight(mainRef)
  const mounted = !!canvasSize.width
  return (
    <div className="Playground" ref={mainRef}>
      {mounted && <PolyrhythmCanvas canvasSize={canvasSize} />}
    </div>
  )
}
export default PolyrhythmPlayground

type PolyrhythmCanvasProps = { canvasSize: CanvasSize }
const PolyrhythmCanvas = ({ canvasSize }: PolyrhythmCanvasProps) => {
  const [interaction, canvasRef] = useCanvas(canvasSize)
  useCanvasVisualization(interaction, canvasRef)

  return <canvas className="Visualization" ref={canvasRef} onContextMenu={(e) => e.preventDefault()} />
}
