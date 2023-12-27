import React from 'react'
import { useCanvas } from '../hooks/canvas-hook'

type PolyrhythmCanvasProps = { width: number; height: number }
function PolyrhythmCanvas({ width, height }: PolyrhythmCanvasProps) {
  const fillBackGround = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'rgb(31,31,36)'
    ctx.fillRect(0, 0, width, height)
  }
  const canvasRef = useCanvas(width, height, fillBackGround)
  return <canvas ref={canvasRef} />
}
export default PolyrhythmCanvas
