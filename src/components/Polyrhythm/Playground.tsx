import { useCanvas, useClientWidthHeight } from '@/hooks/canvas-hook'
import { usePolyrhythmActions } from '@/hooks/polyrhythm-hook'
import { useAnimate, useVisualization } from '@/hooks/visualization-hook'
import { CanvasSize } from '@/types/canvas-types'
import styled from '@emotion/styled'
import React, { RefObject, useRef } from 'react'

const PlaygroundContainer = styled.div`
  overflow: hidden;
  display: flex;

  width: 100%;
  height: 100%;
`

const Playground = () => {
  const mainRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
  const playgroundSize = useClientWidthHeight(mainRef)
  return (
    <PlaygroundContainer ref={mainRef}>
      <PolyrhythmCanvas canvasSize={playgroundSize} />
    </PlaygroundContainer>
  )
}
export default Playground

const CanvasVisualization = styled.canvas`
  display: block;
`

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
  return <CanvasVisualization ref={canvasRef} onClick={handleRegister} onContextMenu={handleDeregister} />
}
