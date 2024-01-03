import { Time } from 'tone/build/esm/core/type/Units'
import { Point } from './canvas-types'

export type Rhythm = { id: number; interval: Time; position: Point }
