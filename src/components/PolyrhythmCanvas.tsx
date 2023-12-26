import React from 'react'
import { useCanvas } from '../hooks/canvas-hook'

type PolyrhythmCanvasProps = { width: number; height: number }
function Polyrhythm({ width, height }: PolyrhythmCanvasProps) {
  const canvasRef = useCanvas(width, height)
  return <canvas ref={canvasRef} />
}
export default Polyrhythm
