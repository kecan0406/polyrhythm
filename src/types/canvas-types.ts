export type CanvasSize = { width: number; height: number }
export type CanvasPoint = { x: number; y: number }

export type ResizeInteraction = { type: 'resize'; value: CanvasSize }
export type ClickInteraction = { type: 'click' | 'contextmenu'; value: CanvasPoint }
export type WheelInteraction = { type: 'wheelUp' | 'wheelDown'; value: CanvasPoint }
export type Interaction = ResizeInteraction | ClickInteraction | WheelInteraction
