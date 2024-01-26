import { useCanvas } from '@/hooks/useCanvas'
import { useClientWidthHeight } from '@/hooks/useClientWithHeight'
import { useRhythmAction } from '@/hooks/useRhythmAction'
import { useRhythmValue } from '@/hooks/useRhythmValue'
import { CanvasSize } from '@/types/canvas-types'
import styled from '@emotion/styled'
import React, { MouseEvent, RefObject, WheelEvent, useEffect, useRef } from 'react'

const MainContainer = styled.div`
  overflow: hidden;
  display: flex;

  width: 100%;
  height: 100%;
`

const Main = () => {
  const mainRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
  const playgroundSize = useClientWidthHeight(mainRef)

  return (
    <MainContainer ref={mainRef}>
      <PolyrhythmCanvas canvasSize={playgroundSize} />
    </MainContainer>
  )
}
export default Main

const CanvasVisualization = styled.canvas`
  display: block;
`

type PolyrhythmCanvasProps = { canvasSize: CanvasSize }
const PolyrhythmCanvas = ({ canvasSize }: PolyrhythmCanvasProps) => {
  const { selectId, interval } = useRhythmValue()
  const rhythmAction = useRhythmAction()
  const canvasRef = useCanvas(canvasSize)

  useEffect(() => {
    // visualization.preview.interval = interval
  }, [interval])

  const handleRegister = (e: MouseEvent) => {
    if (selectId) return

    rhythmAction.register({ x: e.clientX, y: e.clientY })
  }

  const handleDeregister = (e: MouseEvent) => {
    rhythmAction.deRegister(selectId)
    e.preventDefault()
  }

  const handleInterval = (e: WheelEvent) => {
    rhythmAction.setInterval(e.deltaY < 0)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePreview = (e: MouseEvent) => {
    // visualization.preview.active = !selectId
    // visualization.preview.position = { x: e.clientX, y: e.clientY }
  }

  const handlePreviewLeave = () => {
    // visualization.preview.active = false
  }

  return (
    <CanvasVisualization
      ref={canvasRef}
      onClick={handleRegister}
      onContextMenu={handleDeregister}
      onWheel={handleInterval}
      onMouseMove={handlePreview}
      onMouseLeave={handlePreviewLeave}
    />
  )
}
