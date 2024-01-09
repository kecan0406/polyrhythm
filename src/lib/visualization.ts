import { getTransport } from 'tone'
import { Transport } from 'tone/build/esm/core/clock/Transport'
import { Point } from '../types/canvas-types'
import { Rhythm } from './polyrhythm'
import { PI2 } from './utils/math-util'

export class Visualization {
  private transport: Transport = getTransport()
  private visuals: Visual[] = []

  public generateVisual(polyrhythm: Rhythm[]) {
    this.visuals = polyrhythm.map((rhythm) => new Polygon(rhythm))
  }

  public clearVisual() {
    this.visuals = []
  }

  public drawAll(ctx: CanvasRenderingContext2D) {
    const ticks = this.transport.toTicks()
    this.visuals.forEach((visual) => visual.draw(ctx, ticks))
  }
}

interface Visual {
  draw(ctx: CanvasRenderingContext2D, ticks: number): void
}

export class Polygon implements Visual {
  private readonly rhythm: Rhythm
  private readonly radius: number

  constructor(rhythm: Rhythm) {
    this.rhythm = rhythm
    this.radius = 100
  }

  public draw(ctx: CanvasRenderingContext2D, ticks: number) {
    ctx.lineWidth = 3
    ctx.strokeStyle = 'rgb(255,255,255)'

    this.drawLines(ctx)
    this.drawDot(ctx, ticks)
  }

  private drawLines(ctx: CanvasRenderingContext2D) {
    const { interval: vertex, position } = this.rhythm
    ctx.beginPath()
    ctx.moveTo(...this.getXY(0, vertex, position))
    for (let i = 1; i <= vertex; i++) {
      ctx.lineTo(...this.getXY(i, vertex, position))
    }
    ctx.stroke()
    ctx.closePath()
  }

  private getXY(i: number, vertex: number, { x, y }: Point): [number, number] {
    const value = (i * PI2) / vertex
    return [x + this.radius * Math.cos(value), y + this.radius * Math.sin(value)]
  }

  private drawDot(ctx: CanvasRenderingContext2D, ticks: number) {
    const { interval: vertex, position } = this.rhythm
    const rate = Math.trunc(ticks / this.rhythm.beats)
    const percent = (ticks % this.rhythm.beats) / this.rhythm.beats
    const lineXY = this.getLineXY(rate, percent, vertex, position)
    ctx.beginPath()
    ctx.fillStyle = 'rgb(255,255,255)'
    ctx.arc(...lineXY, 8, 0, PI2)
    ctx.fill()
    ctx.closePath()
  }

  private getLineXY(rate: number, percent: number, vertex: number, position: Point): [number, number] {
    const from = this.getXY(rate, vertex, position)
    const to = this.getXY(rate + 1, vertex, position)
    const x = from[0] + (to[0] - from[0]) * percent
    const y = from[1] + (to[1] - from[1]) * percent
    return [x, y]
  }
}
