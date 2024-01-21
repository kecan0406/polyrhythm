import { getProgressPercent } from '@/utils/math-util'
import styled from '@emotion/styled'
import React, { MouseEvent, RefObject, useRef } from 'react'

type ProgressProps = { direction: 'horizontal' | 'vertical' }
const ProgressBarBackground = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: gray;
  border-radius: 4px;
  overflow: hidden;
`
const ProgressBarContainer = styled.div<ProgressProps>`
  position: relative;
  width: ${({ direction }) => (direction === 'horizontal' ? '100%' : '12px')};
  height: ${({ direction }) => (direction !== 'horizontal' ? '100%' : '12px')};

  & > ${ProgressBarBackground} {
    width: ${({ direction }) => (direction === 'horizontal' ? '100%' : '4px')};
    height: ${({ direction }) => (direction !== 'horizontal' ? '100%' : '4px')};
  }
`
type ProgressBarActiveProps = { percent: number; isHover: boolean; direction: 'horizontal' | 'vertical' }
const ProgressBarActive = styled.div<ProgressBarActiveProps>`
  width: 100%;
  transform: ${({ percent, direction }) => {
    switch (direction) {
      case 'horizontal':
        return `translateX(${(percent - 1) * 100}%)`
      case 'vertical':
        return `translateY(${(1 - percent) * 100}%)`
    }
  }};
  background: ${({ isHover }) => (isHover ? 'rgb(29, 185, 84)' : 'white')};
  touch-action: none;
`

type ProgressBarProps = {
  progress: number
  isHover: boolean
  onDrag: (percent: number) => void
  direction: 'horizontal' | 'vertical'
}
const ProgressBar = ({ progress, onDrag, isHover, direction }: ProgressBarProps) => {
  const progressBarRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef<boolean>(false)

  const handleDrag = (e: MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = !isDraggingRef.current
    onDrag(getProgressPercent(direction, progressBarRef.current!, e))
  }

  const handleValue = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return
    onDrag(getProgressPercent(direction, progressBarRef.current!, e))
  }

  return (
    <ProgressBarContainer
      direction={direction}
      onMouseUp={handleDrag}
      onMouseDown={handleDrag}
      onMouseLeave={() => (isDraggingRef.current = false)}
      onMouseMove={handleValue}
      ref={progressBarRef}
    >
      <ProgressBarBackground>
        <ProgressBarActive percent={progress} isHover={isHover} direction={direction} />
      </ProgressBarBackground>
    </ProgressBarContainer>
  )
}
export default ProgressBar
