import { Time } from 'tone/build/esm/core/type/Units'
import { getRandomInt } from './math-util'

export const getRandomInterval = (): Time => `${getRandomInt(3, 6)}n`
