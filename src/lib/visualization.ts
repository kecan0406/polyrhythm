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

  public drawAll(ctx: CanvasRenderingContext2D, currentTicks: number, secondsToTicks: number) {
    this.visuals.forEach((visual) => visual.draw(ctx, currentTicks, secondsToTicks))
  }
}

interface Visual {
  draw(ctx: CanvasRenderingContext2D, currentTicks: number, secondsToTicks: number): void
}

export class Polygon implements Visual {
  private readonly rhythm: Rhythm
  private readonly radius: number

  constructor(rhythm: Rhythm) {
    this.rhythm = rhythm
    this.radius = 100
  }

  public draw(ctx: CanvasRenderingContext2D, currentTicks: number, secondsToTicks: number) {
    const ms100Ticks = secondsToTicks * 0.1
    const ticks = currentTicks % this.rhythm.beats

    ticks <= ms100Ticks ? (ctx.lineWidth = 6) : (ctx.lineWidth = 3)
    ctx.strokeStyle = 'rgb(255,255,255)'
    this.drawLines(ctx)
    this.drawDot(ctx, currentTicks)
  }

  private drawLines(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    for (let line = 0; line <= this.rhythm.interval; line++) {
      const { x, y } = this.getArcPoint(line)
      line ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
    }
    ctx.stroke()
    ctx.closePath()
  }

  private drawDot(ctx: CanvasRenderingContext2D, currentTicks: number) {
    ctx.beginPath()
    ctx.fillStyle = 'rgb(255,255,255)'
    const { x, y } = this.getLinePoint(currentTicks)
    ctx.arc(x, y, 8, 0, PI2)
    ctx.fill()
    ctx.closePath()
  }

  private getArcPoint(i: number): Point {
    const { interval, position } = this.rhythm
    const arc = (i * PI2) / interval

    return { x: position.x + this.radius * Math.cos(arc), y: position.y + this.radius * Math.sin(arc) }
  }

  private getLinePoint(currentTicks: number): Point {
    const [line, ratio] = getDivRatio(currentTicks, this.rhythm.beats)
    const { x: fromX, y: fromY } = this.getArcPoint(line)
    const { x: toX, y: toY } = this.getArcPoint(line + 1)

    return { x: fromX + (toX - fromX) * ratio, y: fromY + (toY - fromY) * ratio }
  }
}
