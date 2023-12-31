export type CanvasSize = { width: number; height: number }
export type CanvasPoint = { x: number; y: number }

export type ResizeInteraction = { type: 'resize'; value: CanvasSize }
export type ClickInteraction = { type: keyof HTMLElementEventMap; value: CanvasPoint }
export type Interaction = ResizeInteraction | ClickInteraction
