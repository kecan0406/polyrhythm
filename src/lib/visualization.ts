import { Rhythm } from '@/recoil/rhythm/atom'
import { Point, Size } from '@/types/canvas-types'
import { getTwelveToneRGBA } from '@/utils/color-util'
import { PI2, QUARTER_NOTE, RGB_OPACITY_REGEX, getArcPoint, getCurrentArcPoint, getDivision } from '@/utils/math-util'
import { getTransport } from 'tone'
import { Transport } from 'tone/build/esm/core/clock/Transport'

export class Visualization {
  public preview: Preview = new PreviewPolygon()

  private visuals: Visual[] = []
  private readonly transport: Transport = getTransport()

  public generateVisual(ctx: CanvasRenderingContext2D, rhythms: Rhythm[]) {
    this.visuals = rhythms.map((rhythm) => new Polygon(ctx, rhythm))
  }

  public animate(ctx: CanvasRenderingContext2D, canvasSize: Size) {
    this.clearBackground(ctx, canvasSize)
    this.visuals.forEach((visual) => visual.draw(this.transport.ticks))
    this.preview!.draw(ctx)
  }

  private clearBackground(ctx: CanvasRenderingContext2D, { width, height }: Size) {
    ctx.fillStyle = 'rgb(0,0,0)'
    ctx.clearRect(0, 0, width, height)
    ctx.fillRect(0, 0, width, height)
  }
}

interface Visual {
  draw(currentTick: number): void
}
interface Preview {
  vertex: number
  point: Point
  draw(ctx: CanvasRenderingContext2D): void
}

class Polygon implements Visual {
  private readonly ctx: CanvasRenderingContext2D
  private readonly rhythm: Rhythm

  private color: string = 'rgb(255,255,255,0.2)'
  private currentTick: number = 0
  private readonly radius: number = 150

  constructor(ctx: CanvasRenderingContext2D, rhythm: Rhythm) {
    this.ctx = ctx
    this.rhythm = rhythm
  }

  public draw(currentTick: number) {
    this.currentTick = currentTick
    this.color = getTwelveToneRGBA(this.rhythm.noteSymbol, 0.7)

    this.rhythm.isSelect && this.drawLines(8, 'rgb(255,255,255,1)')
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

export class PreviewPolygon implements Preview {
  public vertex: number = 0
  public point: Point = { x: Infinity, y: Infinity }

  private color: string = 'rgb(255,255,255,0.2)'
  private readonly radius: number = 150

  public draw(ctx: CanvasRenderingContext2D) {
    this.drawLines(ctx, 6, this.color)
  }

  private drawLines(ctx: CanvasRenderingContext2D, size: number, color: string) {
    ctx.beginPath()
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = size
    ctx.strokeStyle = color
    this.drawLine(ctx)
    ctx.stroke()
    ctx.closePath()
  }

  private drawLine(ctx: CanvasRenderingContext2D) {
    for (let currentLine = 0; currentLine <= this.vertex; currentLine++) {
      const { x, y } = getArcPoint(currentLine, this.vertex, this.point, this.radius)
      currentLine ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
    }
  }
}
