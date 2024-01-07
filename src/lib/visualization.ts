import { Point } from '../types/canvas-types'
import { Rhythm } from './polyrhythm'
import { PI2 } from './utils/math-util'

export class Visualization {
  private visuals: Visual[] = []

  public generateVisual(polyrhythm: Rhythm[]) {
    this.visuals = polyrhythm.map((rhythm) => new Polygon(rhythm))
  }

  public clearVisual() {
    this.visuals = []
  }

  public drawAll(ctx: CanvasRenderingContext2D) {
    this.visuals.forEach((visual) => visual.draw(ctx))
  }
}

interface Visual {
  draw(ctx: CanvasRenderingContext2D): void
}

export class Polygon implements Visual {
  private readonly rhythm: Rhythm
  private readonly radius: number

  constructor(rhythm: Rhythm) {
    this.rhythm = rhythm
    this.radius = 100
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = 3
    ctx.strokeStyle = 'rgb(255,255,255)'

    ctx.beginPath()
    this.drawLines(ctx)
    ctx.closePath()
  }

  private drawLines(ctx: CanvasRenderingContext2D) {
    const { interval: vertex, position } = this.rhythm
    ctx.moveTo(...this.getLineXY(0, vertex, position))
    for (let i = 1; i <= vertex; i++) {
      ctx.lineTo(...this.getLineXY(i, vertex, position))
    }
    ctx.stroke()
  }

  private getLineXY(i: number, vertex: number, { x, y }: Point): [number, number] {
    const value = (i * PI2) / vertex
    return [x + this.radius * Math.cos(value), y + this.radius * Math.sin(value)]
  }
}
