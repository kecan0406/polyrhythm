import { Point } from '../types/canvas-types'
import { Rhythm } from './polyrhythm'
import { PI2, parseVertex } from './utils/math-util'

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
  private readonly position: Point
  private readonly vertex: number
  private readonly radius: number

  constructor(rhythm: Rhythm) {
    this.position = rhythm.position
    this.vertex = parseVertex(rhythm.getInterval())
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
    ctx.moveTo(...this.getLineXY(0))
    for (let i = 1; i <= this.vertex; i++) {
      ctx.lineTo(...this.getLineXY(i))
    }
    ctx.stroke()
  }

  private getLineXY(i: number): [number, number] {
    const value = (i * PI2) / this.vertex
    return [this.position.x + this.radius * Math.cos(value), this.position.y + this.radius * Math.sin(value)]
  }
}
