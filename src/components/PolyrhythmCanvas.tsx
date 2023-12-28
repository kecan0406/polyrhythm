import React, { RefObject, useRef } from 'react'
import { useCanvas, useClientWidthHeight } from '../hooks/canvas-hook'
import { Light, LightSource } from '../lib/lightsource'

function PolyrhythmPlayground() {
  const mainRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  const { width: clientWidth, height: clientHeight } =
    useClientWidthHeight(mainRef)

  return (
    <div className="Playground" ref={mainRef}>
      <PolyrhythmCanvas width={clientWidth} height={clientHeight} />
    </div>
  )
}

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
  return <canvas className="Visualization" ref={canvasRef} />
}

export default PolyrhythmPlayground
