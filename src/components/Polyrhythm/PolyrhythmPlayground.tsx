import React, { RefObject, useRef, useState } from 'react'
import { useCanvas, useCanvasAnimate, useClientWidthHeight } from '../../hooks/canvas-hook'
import { Polygon } from '../../lib/visualization'
import { CanvasSize } from '../../types/canvas-types'

const PolyrhythmPlayground = () => {
  const mainRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
  const canvasSize = useClientWidthHeight(mainRef)

  return (
    <div className="Playground" ref={mainRef}>
      <PolyrhythmCanvas canvasSize={canvasSize} />
    </div>
  )
}
export default PolyrhythmPlayground

type PolyrhythmCanvasProps = { canvasSize: CanvasSize }
const PolyrhythmCanvas = ({ canvasSize }: PolyrhythmCanvasProps) => {
  const [polygonList, setPolygonList] = useState<Polygon[]>([])

  const canvasRef = useCanvas(canvasSize)
  useCanvasAnimate(canvasRef, canvasSize, polygonList)

  const handlePolygon = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const polygon = new Polygon(e.clientX, e.clientY)
    setPolygonList(polygonList.concat(polygon))
  }
  return <canvas className="Visualization" ref={canvasRef} onClick={handlePolygon} onContextMenu={handlePolygon} />
}
