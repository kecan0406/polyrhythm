import { getProgressPercent } from '@/utils/math-util'
import styled from '@emotion/styled'
import React, { MouseEvent, RefObject, useRef, useState } from 'react'

const ProgressBarBackground = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: gray;
  border-radius: 4px;
  overflow: hidden;
`
const ProgressBarContainer = styled.div`
  position: relative;
`
type ProgressBarActiveProps = { progress: number; hover: boolean; direction: 'horizontal' | 'vertical' }
const ProgressBarActive = styled.div<ProgressBarActiveProps>`
  width: 100%;
  transform: ${({ progress, direction }) => {
    switch (direction) {
      case 'horizontal':
        return `translateX(${(progress - 1) * 100}%)`
      case 'vertical':
        return `translateY(${(1 - progress) * 100}%)`
    }
  }};
  background: ${({ hover }) => (hover ? 'rgb(29, 185, 84)' : 'white')};
  touch-action: none;
`

type SliderProps = { direction: 'horizontal' | 'vertical' }
const SliderContainer = styled.div<SliderProps>`
  display: flex;
  ${({ direction }) => (direction === 'horizontal' ? 'width: 50%' : 'height: 100%')};
  align-items: center;

  & > ${ProgressBarContainer} {
    width: ${({ direction }) => (direction === 'horizontal' ? '100%' : '12px')};
    height: ${({ direction }) => (direction !== 'horizontal' ? '100%' : '12px')};
    & > ${ProgressBarBackground} {
      width: ${({ direction }) => (direction === 'horizontal' ? '100%' : '4px')};
      height: ${({ direction }) => (direction !== 'horizontal' ? '100%' : '4px')};
    }
  }
`

type ProgressBarProps = {
  progress: number
  onDrag: (percent: number) => void
  direction: 'horizontal' | 'vertical'
}
const Slider = ({ progress, onDrag, direction }: ProgressBarProps) => {
  const [hover, setHover] = useState<boolean>(false)
  const progressBarRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef<boolean>(false)

  const handleHover = (hover: boolean) => () => {
    setHover(hover)
  }

  const handleDrag = (e: MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = !isDraggingRef.current
    onDrag(getProgressPercent(direction, progressBarRef.current!, e))
  }

  const handleValue = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return
    onDrag(getProgressPercent(direction, progressBarRef.current!, e))
  }

  return (
    <SliderContainer onMouseEnter={handleHover(true)} onMouseLeave={handleHover(false)} direction={direction}>
      <ProgressBarContainer
        onMouseUp={handleDrag}
        onMouseDown={handleDrag}
        onMouseLeave={() => (isDraggingRef.current = false)}
        onMouseMove={handleValue}
        ref={progressBarRef}
      >
        <ProgressBarBackground>
          <ProgressBarActive {...{ progress, hover, direction }} />
        </ProgressBarBackground>
      </ProgressBarContainer>
    </SliderContainer>
  )
}
export default Slider
