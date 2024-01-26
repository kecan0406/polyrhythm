import { TWELVE_TONE_COLORS } from '@/constants/chromesthesia'
import { Rhythm } from '@/recoil/rhythm/atom'
import { Point, Size } from '@/types/canvas-types'
import { PI2, PI_DEG, QUARTER_NOTE, RGB_OPACITY_REGEX, getDivRatio } from '@/utils/math-util'
import { getTransport } from 'tone'
import { Transport } from 'tone/build/esm/core/clock/Transport'

export class Visualization {
  private readonly ctx: CanvasRenderingContext2D
  private readonly transport: Transport = getTransport()
  private visuals: Visual[] = []

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  public generateVisual(rhythms: Rhythm[]) {
    this.visuals = rhythms.map((rhythm) => new Polygon(this.ctx, rhythm))
  }

  public animate(canvasSize: Size) {
    this.drawBackground(canvasSize)
    this.drawVisual()
  }

  private drawBackground({ width, height }: Size) {
    this.ctx.fillStyle = 'rgb(0,0,0)'
    this.ctx.clearRect(0, 0, width, height)
    this.ctx.fillRect(0, 0, width, height)
  }

  private drawVisual() {
    this.visuals.forEach((visual) => visual.draw(this.transport.ticks, this.transport.toTicks(0.15)))
  }
}

interface Visual {
  draw(currentTick: number, activeTime: number): void
}

export class Polygon implements Visual {
  private readonly ctx: CanvasRenderingContext2D
  private readonly rhythm: Rhythm

  private readonly radius: number = 150
  private color: string = 'rgb(255,255,255,0.7)'
  private currentTick: number = 0
  private activeTime: number = 0

  constructor(ctx: CanvasRenderingContext2D, rhythm: Rhythm) {
    this.ctx = ctx
    this.rhythm = rhythm
  }

  public draw(currentTick: number, activeTime: number) {
    this.color = TWELVE_TONE_COLORS[this.rhythm.noteSymbol].replace(RGB_OPACITY_REGEX, '0.7')
    this.currentTick = currentTick
    this.activeTime = activeTime

    this.drawLines(6, this.color)
    this.drawDot(20, this.color)
    this.drawDot(12, 'rgb(255,255,255,0.7)')
  }

  private drawLines(radius: number, color: string) {
    this.ctx.beginPath()
    this.ctx.lineCap = 'round'
    this.ctx.lineJoin = 'round'
    this.ctx.lineWidth = radius
    this.ctx.strokeStyle = color
    this.lineAnimation(radius, color)
    this.drawLine()
    this.ctx.stroke()
    this.ctx.closePath()
  }

  private lineAnimation(radius: number, color: string) {
    const intervalTick = this.currentTick % (QUARTER_NOTE / this.rhythm.interval)
    if (this.activeTime >= intervalTick) {
      const opacity = Number((1 - 0.3 * (intervalTick / this.activeTime)).toFixed(2))
      this.ctx.strokeStyle = color.replace(RGB_OPACITY_REGEX, `${opacity}`)
      this.ctx.lineWidth = radius * (1.5 * opacity)
    }
  }

  private drawLine() {
    for (let line = 0; line <= this.rhythm.interval; line++) {
      const { x, y } = this.getArcPoint(line)
      line ? this.ctx.lineTo(x, y) : this.ctx.moveTo(x, y)
    }
  }

  private drawDot(radius: number, color: string) {
    this.ctx.beginPath()
    this.ctx.fillStyle = color

    const { x, y } = this.getLinePoint()
    this.ctx.arc(x, y, radius, 0, PI2)
    this.ctx.fill()
    this.ctx.closePath()
  }

  private getArcPoint(i: number): Point {
    const { interval, position } = this.rhythm
    const arc = (i * PI2) / interval + PI_DEG

    return { x: position.x + this.radius * Math.cos(arc), y: position.y + this.radius * Math.sin(arc) }
  }

  private getLinePoint(): Point {
    const [line, ratio] = getDivRatio(this.currentTick, Math.round(QUARTER_NOTE / this.rhythm.interval))
    const { x: fromX, y: fromY } = this.getArcPoint(line)
    const { x: toX, y: toY } = this.getArcPoint(line + 1)

    return { x: fromX + (toX - fromX) * ratio, y: fromY + (toY - fromY) * ratio }
  }
}

export class PreviewPolygon implements Visual {
  private readonly ctx: CanvasRenderingContext2D
  private readonly radius: number = 150
  private readonly color: string = 'rgb(255,255,255,0.2)'
  public active: boolean = false
  public interval: number = 3
  public position: Point = { x: 0, y: 0 }
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  public draw() {
    this.active && this.drawLines(6)
  }

  private drawLines(radius: number) {
    this.ctx.beginPath()
    this.ctx.lineCap = 'round'
    this.ctx.lineJoin = 'round'
    this.ctx.lineWidth = radius
    this.ctx.strokeStyle = this.color

    for (let line = 0; line <= this.interval; line++) {
      const { x, y } = this.getArcPoint(line)
      line ? this.ctx.lineTo(x, y) : this.ctx.moveTo(x, y)
    }
    this.ctx.stroke()
    this.ctx.closePath()
  }

  private getArcPoint(i: number): Point {
    const { interval, position } = this
    const arc = (i * PI2) / interval + PI_DEG
    return { x: position.x + this.radius * Math.cos(arc), y: position.y + this.radius * Math.sin(arc) }
  }
}
