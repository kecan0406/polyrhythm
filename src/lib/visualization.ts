import { Rhythm } from '@/recoil/rhythm/atom'
import { Point, Size } from '@/types/canvas-types'
import { getTwelveToneRGBA } from '@/utils/color-util'
import {
  PI2,
  PI_DEG,
  QUARTER_NOTE,
  RGB_OPACITY_REGEX,
  getArcPoint,
  getCurrentArcPoint,
  getDivision,
} from '@/utils/math-util'
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
    this.clearBackground(canvasSize)
    this.drawVisual()
  }

  private clearBackground({ width, height }: Size) {
    this.ctx.fillStyle = 'rgb(0,0,0)'
    this.ctx.clearRect(0, 0, width, height)
    this.ctx.fillRect(0, 0, width, height)
  }

  private drawVisual() {
    this.visuals.forEach((visual) => visual.draw(this.transport.ticks))
  }
}

interface Visual {
  draw(currentTick: number): void
}

class Polygon implements Visual {
  private readonly ctx: CanvasRenderingContext2D
  private readonly rhythm: Rhythm

  private readonly radius: number = 150
  private color: string = 'rgb(255,255,255,0.7)'
  private currentTick: number = 0

  constructor(ctx: CanvasRenderingContext2D, rhythm: Rhythm) {
    this.ctx = ctx
    this.rhythm = rhythm
  }

  public draw(currentTick: number) {
    this.currentTick = currentTick
    this.color = getTwelveToneRGBA(this.rhythm.noteSymbol, 0.7)

    this.rhythm.selected && this.drawLines(8, 'rgb(255,255,255,1)')
    this.drawLines(6, this.color)
    this.drawDot(20, this.color)
    this.drawDot(12, 'rgb(255,255,255,0.7)')
  }

  private drawLines(size: number, color: string) {
    this.ctx.beginPath()
    this.ctx.lineCap = 'round'
    this.ctx.lineJoin = 'round'
    this.ctx.lineWidth = size
    this.ctx.strokeStyle = color
    this.lineAnimation(size, color)
    this.drawLine()
    this.ctx.stroke()
    this.ctx.closePath()
  }

  private drawDot(size: number, color: string) {
    this.ctx.beginPath()
    this.ctx.fillStyle = color
    const { x, y } = getCurrentArcPoint(this.currentTick, this.rhythm.interval, this.rhythm.point, this.radius)
    this.ctx.arc(x, y, size, 0, PI2)
    this.ctx.fill()
    this.ctx.closePath()
  }

  private lineAnimation(size: number, color: string) {
    const { remainRate: activeRate } = getDivision(this.currentTick, QUARTER_NOTE / this.rhythm.interval)
    if (activeRate <= 0.25) {
      const opacity = Number((1 - activeRate).toFixed(2))
      this.ctx.strokeStyle = color.replace(RGB_OPACITY_REGEX, `${opacity}`)
      this.ctx.lineWidth = size * (1.5 * opacity)
    }
  }

  private drawLine() {
    for (let currentLine = 0; currentLine <= this.rhythm.interval; currentLine++) {
      const { x, y } = getArcPoint(currentLine, this.rhythm.interval, this.rhythm.point, this.radius)
      currentLine ? this.ctx.lineTo(x, y) : this.ctx.moveTo(x, y)
    }
  }
}

export class PreviewPolygon implements Visual {
  private readonly ctx: CanvasRenderingContext2D
  private readonly radius: number = 150
  private readonly color: string = 'rgb(255,255,255,0.2)'
  public active: boolean = false
  public interval: number = 3
  public point: Point = { x: 0, y: 0 }

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
    const { interval, point } = this
    const arc = (i * PI2) / interval + PI_DEG
    return { x: point.x + this.radius * Math.cos(arc), y: point.y + this.radius * Math.sin(arc) }
  }
}
