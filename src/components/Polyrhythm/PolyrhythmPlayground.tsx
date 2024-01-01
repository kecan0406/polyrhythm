import React, { RefObject, useRef } from 'react'
import { useCanvas, useClientWidthHeight, useVisualization } from '../../hooks/canvas-hook'
import { useInteractionActions } from '../../hooks/interaction-hook'
import { CanvasSize, ClickInteraction, WheelInteraction } from '../../types/canvas-types'

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
  const interactionActions = useInteractionActions()
  const animate = useVisualization()

  const handleClickInteraction = (e: React.MouseEvent) => {
    const { type, clientX: x, clientY: y } = e
    interactionActions.canvasInteraction({ type, value: { x, y } } as ClickInteraction)
    e.preventDefault()
  }

  const handleWheelInteraction = ({ ctrlKey, deltaY, clientX: x, clientY: y }: React.WheelEvent) => {
    const type = deltaY ? 'wheelUp' : 'wheelDown'
    !ctrlKey && interactionActions.canvasInteraction({ type, value: { x, y } } as WheelInteraction)
  }

  const canvasRef = useCanvas(canvasSize, animate)
  return (
    <canvas
      className="Visualization"
      ref={canvasRef}
      onClick={handleClickInteraction}
      onContextMenu={handleClickInteraction}
      onWheel={handleWheelInteraction}
    />
  )
}
