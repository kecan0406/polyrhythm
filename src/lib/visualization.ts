import { Point } from '../types/canvas-types'
import { Rhythm } from './polyrhythm'
import { PI2, getDivRatio } from './utils/math-util'

export class Visualization {
  private visuals: Visual[] = []

  public generateVisual(polyrhythm: Rhythm[]) {
    this.visuals = polyrhythm.map((rhythm) => new Polygon(rhythm))
  }

  public clearVisual() {
    this.visuals = []
  }

  public drawAll(ctx: CanvasRenderingContext2D, currentTick: number) {
    this.visuals.forEach((visual) => visual.draw(ctx, currentTick))
  }
}

interface Visual {
  draw(ctx: CanvasRenderingContext2D, currentTick: number): void
}

export class Polygon implements Visual {
  private readonly rhythm: Rhythm
  private readonly quarterTick: number

  private readonly strokeStyle: string = 'rgb(255,255,255)'
  private readonly radius: number = 100
  private currentTick: number = 0

  constructor(rhythm: Rhythm) {
    this.rhythm = rhythm
    this.quarterTick = rhythm.getQuarterTick()
  }

  public draw(ctx: CanvasRenderingContext2D, currentTick: number) {
    this.currentTick = currentTick
    ctx.lineWidth = 3
    ctx.strokeStyle = this.strokeStyle

    this.drawCTX(ctx, this.drawLines.bind(this))
    this.drawCTX(ctx, this.drawDot.bind(this))
  }

  private drawCTX(ctx: CanvasRenderingContext2D, draw: (ctx: CanvasRenderingContext2D) => void) {
    ctx.beginPath()
    draw(ctx)
    ctx.closePath()
  }

  private drawLines(ctx: CanvasRenderingContext2D) {
    for (let line = 0; line <= this.rhythm.interval; line++) {
      const { x, y } = this.getArcPoint(line)
      line ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
    }
    ctx.stroke()
  }

  private drawDot(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'rgb(255,255,255)'
    const { x, y } = this.getLinePoint()
    ctx.arc(x, y, 8, 0, PI2)
    ctx.fill()
  }

  private getArcPoint(i: number): Point {
    const { interval, position } = this.rhythm
    const arc = (i * PI2) / interval

    return { x: position.x + this.radius * Math.cos(arc), y: position.y + this.radius * Math.sin(arc) }
  }

  private getLinePoint(): Point {
    const [line, ratio] = getDivRatio(this.currentTick, this.quarterTick)
    const { x: fromX, y: fromY } = this.getArcPoint(line)
    const { x: toX, y: toY } = this.getArcPoint(line + 1)

    return { x: fromX + (toX - fromX) * ratio, y: fromY + (toY - fromY) * ratio }
  }
}
