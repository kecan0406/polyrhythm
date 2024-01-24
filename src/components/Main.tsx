import { useCanvas, useClientWidthHeight } from '@/hooks/canvas-hook'
import { getAnimate, useVisualization } from '@/hooks/visualization-hook'
import { withInterval } from '@/recoil/rhythm'
import { rhythmSelectAtom } from '@/recoil/rhythm/atom'
import { usePolyrhythmAction } from '@/recoil/rhythm/rhythm-config-hook'
import { CanvasSize } from '@/types/canvas-types'
import { valueLimit } from '@/utils/math-util'
import styled from '@emotion/styled'
import React, { RefObject, useEffect, useRef } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { getTransport } from 'tone'

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
  const polyrhythmAction = usePolyrhythmAction()
  const isSelect = useRecoilValue(rhythmSelectAtom) !== null

  const setRhythmInterval = useSetRecoilState(withInterval)

  useEffect(() => {
    const transport = getTransport()
    transport.loop = true
    transport.loopStart = 0
    transport.loopEnd = '1m'
    transport.timeSignature = [4, 4]
  }, [])

  const handleRegister = (e: React.MouseEvent) => {
    if (isSelect) return

    polyrhythmAction.register({ x: e.clientX, y: e.clientY })
  }

  const handleDeregister = (e: React.MouseEvent) => {
    polyrhythmAction.deRegister()
    e.preventDefault()
  }

  const handlePreviewPosition = (e: React.MouseEvent) => {
    visualization.preview.isShow = !isSelect
    visualization.preview.position = { x: e.clientX, y: e.clientY }
  }

  const handlePreviewInterval = (e: React.WheelEvent) => {
    const plus = e.deltaY < 0 ? 1 : -1
    setRhythmInterval((currInterval) => valueLimit(currInterval + plus, 2, 16))
  }

  const canvasRef = useCanvas(canvasSize, getAnimate(visualization))
  return (
    <CanvasVisualization
      ref={canvasRef}
      onClick={handleRegister}
      onContextMenu={handleDeregister}
      onMouseMove={handlePreviewPosition}
      onMouseEnter={() => (visualization.preview.isShow = true)}
      onMouseLeave={() => (visualization.preview.isShow = false)}
      onWheel={handlePreviewInterval}
    />
  )
}
