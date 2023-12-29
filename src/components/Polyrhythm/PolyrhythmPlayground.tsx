import React, { RefObject, useRef } from 'react'
import { useCanvas, useClientWidthHeight } from '../../hooks/canvas-hook'
import { Polygon, Visualization } from '../../lib/visualization'
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
  const animate = (ctx: CanvasRenderingContext2D) => {
    fillBackGround(ctx)
  }

  const fillBackGround = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'rgb(31,31,36)'
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)
  }

  const handleDrawPolygon = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const polygon: Visualization = new Polygon(e.clientX - canvas.getBoundingClientRect().x, e.clientY)
    polygon.draw(ctx)
  }

  const canvasRef: RefObject<HTMLCanvasElement> = useCanvas(canvasSize, animate)
  return <canvas className="Visualization" ref={canvasRef} onClick={handleDrawPolygon} />
}
