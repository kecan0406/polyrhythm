import { getRandomIntInclusive, PI2 } from './utils/Math'

export interface Visualization {
  draw: (ctx: CanvasRenderingContext2D) => void
}

export class Polygon implements Visualization {
  private readonly centerX: number
  private readonly centerY: number
  private readonly vertex: number
  private readonly radius: number

  constructor(pointX: number, pointY: number) {
    this.centerX = pointX
    this.centerY = pointY
    this.vertex = getRandomIntInclusive(3, 8)
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
    return [this.centerX + this.radius * Math.cos(value), this.centerY + this.radius * Math.sin(value)]
  }
}
