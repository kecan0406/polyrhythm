import { TWELVE_TONE_COLORS } from '@/constants/chromesthesia'
import { Point } from '@/types/canvas-types'
import { OPACITY_REGEX, PI2, QUARTER_NOTE, getDivRatio } from '@/utils/math-util'
import { Rhythm } from './polyrhythm'

export class Visualization {
  public preview: PreviewPolygon = new PreviewPolygon()
  private visuals: Visual[] = []

  public generateVisual(polyrhythm: Rhythm[]) {
    this.visuals = polyrhythm.map((rhythm) => new Polygon(rhythm))
  }

  public clearVisual() {
    this.visuals = []
  }

  public drawAll(ctx: CanvasRenderingContext2D) {
    this.visuals.forEach((visual) => visual.draw(ctx))
    this.preview.draw(ctx)
  }
}

interface Visual {
  draw(ctx: CanvasRenderingContext2D): void
}

export class PreviewPolygon implements Visual {
  private readonly radius: number = 150
  private readonly color: string = 'rgb(255,255,255,0.2)'
  public isShow: boolean = false
  public interval: number = 3
  public position: Point = { x: 0, y: 0 }

  public draw(ctx: CanvasRenderingContext2D) {
    this.isShow && this.drawLines(ctx, 6)
  }

  private drawLines(ctx: CanvasRenderingContext2D, radius: number) {
    ctx.beginPath()
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = radius
    ctx.strokeStyle = this.color

    for (let line = 0; line <= this.interval; line++) {
      const { x, y } = this.getArcPoint(line)
      line ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
    }
    ctx.stroke()
    ctx.closePath()
  }

  private getArcPoint(i: number): Point {
    const { interval, position } = this
    const arc = (i * PI2) / interval

    return { x: position.x + this.radius * Math.cos(arc), y: position.y + this.radius * Math.sin(arc) }
  }
}

export class Polygon implements Visual {
  private readonly rhythm: Rhythm

  private readonly radius: number = 150
  private color: string = 'rgb(255,255,255,0.7)'
  private currentTick: number = 0

  constructor(rhythm: Rhythm) {
    this.rhythm = rhythm
  }

  public draw(ctx: CanvasRenderingContext2D) {
    const { color } = TWELVE_TONE_COLORS.find((color) => this.rhythm.noteSymbol.startsWith(color.note)) ?? {
      color: 'rgb(255,255,255,1)',
    }

    this.color = color.replace(OPACITY_REGEX, '0.7')
    this.currentTick = this.rhythm.transport.ticks

    this.drawLines(ctx, 6)
    this.drawDot(ctx, 20, this.color)
    this.drawDot(ctx, 12, 'rgb(255,255,255,0.7)')
  }

  private drawLines(ctx: CanvasRenderingContext2D, radius: number) {
    ctx.beginPath()
    const activeTime = this.rhythm.transport.toTicks(0.15)
    const vertexTick = this.currentTick % (QUARTER_NOTE / this.rhythm.interval)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = radius
    ctx.strokeStyle = this.color
    if (activeTime >= vertexTick) {
      const opacity = Number((1 - 0.3 * (vertexTick / activeTime)).toFixed(2))
      ctx.strokeStyle = this.color.replace(OPACITY_REGEX, `${opacity}`)
      ctx.lineWidth = radius * (1.5 * opacity)
    }

    for (let line = 0; line <= this.rhythm.interval; line++) {
      const { x, y } = this.getArcPoint(line)
      line ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
    }
    ctx.stroke()
    ctx.closePath()
  }

  private drawDot(ctx: CanvasRenderingContext2D, radius: number, color: string) {
    ctx.beginPath()
    ctx.fillStyle = color

    const { x, y } = this.getLinePoint()
    ctx.arc(x, y, radius, 0, PI2)
    ctx.fill()
    ctx.closePath()
  }

  private getArcPoint(i: number): Point {
    const { interval, position } = this.rhythm
    const arc = (i * PI2) / interval

    return { x: position.x + this.radius * Math.cos(arc), y: position.y + this.radius * Math.sin(arc) }
  }

  private getLinePoint(): Point {
    const [line, ratio] = getDivRatio(this.currentTick, Math.round(QUARTER_NOTE / this.rhythm.interval))
    const { x: fromX, y: fromY } = this.getArcPoint(line)
    const { x: toX, y: toY } = this.getArcPoint(line + 1)

    return { x: fromX + (toX - fromX) * ratio, y: fromY + (toY - fromY) * ratio }
  }
}
