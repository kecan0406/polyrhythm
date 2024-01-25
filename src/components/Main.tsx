import { useCanvas } from '@/hooks/useCanvas'
import { useClientWidthHeight } from '@/hooks/useClientWithHeight'
import { useRhythmAction } from '@/hooks/useRhythmAction'
import { getAnimate, useVisualization } from '@/hooks/useVisualization'
import { rhythmWithInterval, selectRhythmIdAtom } from '@/recoil/rhythm'
import { CanvasSize, Point } from '@/types/canvas-types'
import styled from '@emotion/styled'
import React, { MouseEvent, RefObject, WheelEvent, useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'

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
  const visualization = useVisualization()
  const rhythmAction = useRhythmAction()
  const rhythmInterval = useRecoilValue(rhythmWithInterval)
  const previewActive = useRecoilValue(selectRhythmIdAtom) === null

  useEffect(() => {
    visualization.preview.interval = rhythmInterval
  }, [rhythmInterval])

  const handleRegister = (e: MouseEvent) => {
    const position: Point = { x: e.clientX, y: e.clientY }
    rhythmAction.register(position)
  }

  const handleDeregister = (e: MouseEvent) => {
    rhythmAction.deRegister()
    e.preventDefault()
  }

  const handleInterval = (e: WheelEvent) => {
    const plus = e.deltaY < 0
    rhythmAction.setInterval(plus)
  }

  const handlePreview = (active: boolean) => (e: MouseEvent) => {
    visualization.preview.active = active
    visualization.preview.position = { x: e.clientX, y: e.clientY }
  }

  const canvasRef = useCanvas(canvasSize, getAnimate(visualization))
  return (
    <CanvasVisualization
      ref={canvasRef}
      onClick={handleRegister}
      onContextMenu={handleDeregister}
      onWheel={handleInterval}
      onMouseMove={handlePreview(previewActive)}
      onMouseEnter={handlePreview(previewActive)}
      onMouseLeave={handlePreview(false)}
    />
  )
}
