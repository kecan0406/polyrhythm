import { Rhythm } from '@/recoil/rhythm/atom'
import { Point, Size } from '@/types/canvas-types'
import { NoteSymbol } from '@/types/rhythm-types'
import { getTwelveToneRGBA } from '@/utils/color-util'
import { PI2, QUARTER_NOTE, RGB_OPACITY_REGEX, getArcPoint, getCurrentArcPoint, getDivision } from '@/utils/math-util'
import { getTransport } from 'tone'
import { Transport } from 'tone/build/esm/core/clock/Transport'

export class Visualization {
  public preview: Visual = new PreviewPolygon()
  private visuals: Visual[] = []

  public generateVisual(rhythms: Rhythm[]) {
    this.visuals = rhythms.map((rhythm) => new Polygon(rhythm))
  }

  public animate(ctx: CanvasRenderingContext2D, canvasSize: Size) {
    this.clearBackground(ctx, canvasSize)
    this.visuals.forEach((visual) => visual.draw(ctx))
    this.preview.draw(ctx)
  }

  private clearBackground(ctx: CanvasRenderingContext2D, { width, height }: Size) {
    ctx.fillStyle = 'rgb(0,0,0)'
    ctx.clearRect(0, 0, width, height)
    ctx.fillRect(0, 0, width, height)
  }
}

interface Visual {
  vertex: number
  point: Point
  draw(ctx: CanvasRenderingContext2D): void
}

class DrawingStrategy {
  public drawing(ctx: CanvasRenderingContext2D, drawFunc: () => void) {
    ctx.beginPath()
    drawFunc()
    ctx.closePath()
  }
}

class Polygon extends DrawingStrategy implements Visual {
  public vertex: number
  public point: Point

  private color: string = 'rgb(255,255,255,0.2)'
  private currentTick: number = 0
  private readonly transport: Transport = getTransport()
  private readonly radius: number = 150
  private readonly noteSymbol: NoteSymbol
  private readonly selected: boolean

  constructor(rhythm: Rhythm) {
    super()
    this.vertex = rhythm.interval
    this.point = rhythm.point
    this.noteSymbol = rhythm.noteSymbol
    this.selected = rhythm.isSelect
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.color = getTwelveToneRGBA(this.noteSymbol, 0.7)
    this.currentTick = this.transport.ticks

    this.selected && this.drawing(ctx, () => this.drawLines(ctx, 8, 'rgb(255,255,255,1)'))
    this.drawing(ctx, () => this.drawLines(ctx, 6, this.color))
    this.drawing(ctx, () => this.drawDot(ctx, 20, this.color))
    this.drawing(ctx, () => this.drawDot(ctx, 12, 'rgb(255,255,255,0.7)'))
  }

  private drawLines(ctx: CanvasRenderingContext2D, size: number, color: string) {
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = size
    ctx.strokeStyle = color
    this.lineAnimation(ctx, size, color)
    this.drawLine(ctx)
    ctx.stroke()
  }

  private drawDot(ctx: CanvasRenderingContext2D, size: number, color: string) {
    ctx.fillStyle = color
    const { x, y } = getCurrentArcPoint(this.currentTick, this.vertex, this.point, this.radius)
    ctx.arc(x, y, size, 0, PI2)
    ctx.fill()
  }

  private lineAnimation(ctx: CanvasRenderingContext2D, size: number, color: string) {
    const { remainRate: activeRate } = getDivision(this.currentTick, QUARTER_NOTE / this.vertex)
    if (activeRate <= 0.25) {
      const opacity = Number((1 - activeRate).toFixed(2))
      ctx.strokeStyle = color.replace(RGB_OPACITY_REGEX, `${opacity}`)
      ctx.lineWidth = size * (1.5 * opacity)
    }
  }

  private drawLine(ctx: CanvasRenderingContext2D) {
    for (let currentLine = 0; currentLine <= this.vertex; currentLine++) {
      const { x, y } = getArcPoint(currentLine, this.vertex, this.point, this.radius)
      currentLine ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
    }
  }
}

export class PreviewPolygon extends DrawingStrategy implements Visual {
  public vertex: number = 0
  public point: Point = { x: Infinity, y: Infinity }

  private color: string = 'rgb(255,255,255,0.2)'
  private readonly radius: number = 150

  public draw(ctx: CanvasRenderingContext2D) {
    this.drawing(ctx, () => this.drawLines(ctx, 6, this.color))
  }

  private drawLines(ctx: CanvasRenderingContext2D, size: number, color: string) {
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = size
    ctx.strokeStyle = color
    this.drawLine(ctx)
    ctx.stroke()
  }

  private drawLine(ctx: CanvasRenderingContext2D) {
    for (let currentLine = 0; currentLine <= this.vertex; currentLine++) {
      const { x, y } = getArcPoint(currentLine, this.vertex, this.point, this.radius)
      currentLine ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
    }
  }
}
