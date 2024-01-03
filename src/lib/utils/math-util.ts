import { Time } from 'tone/build/esm/core/type/Units'

export const PI2 = 2 * Math.PI
export const EULER_NUMBER = Math.E

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) // The maximum is inclusive and the minimum is inclusive
}

export const parseVertex = (interval: Time) => parseInt(interval as string)
