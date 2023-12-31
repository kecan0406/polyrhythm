import React, { RefObject, useRef, useState } from 'react'
import { useCanvas, useClientWidthHeight, useVisualization } from '../../hooks/canvas-hook'
import { CanvasSize, ClickInteraction, Interaction, WheelInteraction } from '../../types/canvas-types'

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
  const [interaction, setInteraction] = useState<Interaction>(null)

  const animate = useVisualization(interaction)

  const handleClickInteraction = ({ type, clientX: x, clientY: y }: React.MouseEvent) => {
    setInteraction({ type, value: { x, y } } as ClickInteraction)
  }
  const handleWheelInteraction = ({ ctrlKey, deltaY, clientX: x, clientY: y }: React.WheelEvent) => {
    const type = deltaY ? 'wheelUp' : 'wheelDown'
    !ctrlKey && setInteraction({ type, value: { x, y } } as WheelInteraction)
  }

  const canvasRef = useCanvas(canvasSize, animate)
  return (
    <canvas
      className="Visualization"
      ref={canvasRef}
      onClick={handleClickInteraction}
      onContextMenu={(e) => {
        e.preventDefault()
        handleClickInteraction(e)
      }}
      onWheel={handleWheelInteraction}
    />
  )
}
