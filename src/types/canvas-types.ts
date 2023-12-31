export type CanvasSize = { width: number; height: number }
export type Point = { x: number; y: number }

export type ClickInteraction = { type: 'click' | 'contextmenu'; value: Point }
export type WheelInteraction = { type: 'wheelUp' | 'wheelDown'; value: Point }
export type Interaction = ClickInteraction | WheelInteraction | null
