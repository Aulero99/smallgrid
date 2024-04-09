import { logger } from './utils/Logger.js'

class Pop {
  test() {
    logger.log('Dev Mode confirmed - pop')
  }
}

export const pop = new Pop()
