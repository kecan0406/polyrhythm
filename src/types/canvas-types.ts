export type Size = { width: number; height: number }
export type CanvasSize = Size
export type Point = { x: number; y: number }
export type XY = [number, number]

export type ClickInteraction = { type: 'click' | 'contextmenu'; value: Point }
export type WheelInteraction = { type: 'wheelUp' | 'wheelDown'; value: Point }
export type CanvasInteraction = ClickInteraction | WheelInteraction
export type ControllerInteraction = ClickInteraction | WheelInteraction
export type Interaction = CanvasInteraction | ControllerInteraction | null
