import React, { RefObject } from 'react'
import { useCanvas } from '../hooks/canvas-hook'
import { Light, LightSource } from '../lib/lightsource'

type PolyrhythmCanvasProps = { width: number; height: number }
function PolyrhythmCanvas({ width, height }: PolyrhythmCanvasProps) {
  const fillBackGround = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'rgb(31,31,36)'
    ctx.fillRect(0, 0, width, height)
  }

  const lightSource: LightSource = new Light(width, height)

  const animate = (ctx: CanvasRenderingContext2D) => {
    fillBackGround(ctx)
    lightSource.drawRadialGradientBehindLightSource(ctx)
    lightSource.drawLightSource(ctx)
  }

  const canvasRef: RefObject<HTMLCanvasElement> = useCanvas(
    width,
    height,
    animate,
  )
  return <canvas ref={canvasRef} />
}
export default PolyrhythmCanvas
