import { setter } from './EventSetter.js'
import { volSizer } from './VolSizer.js'
import { logger } from './utils/Logger.js'
import { vars } from './_variables.js'
import { options } from './utils/Options.js'

class Suspendors {
  constructor() {
    logger.log('Suspendors Online')

    volSizer.setup()
    setter.setup()
  }

  // NOTE
  // These are functions that will allow for
  // manual triggers of the current breakpoint
  // or orientation that will remain consistent
  // with all listeners and registered
  // functions

  triggerAll() {
    setter.clearAllThenUpdate()
  }

  triggerOrientation() {
    setter.clearOrientThenUpdate()
  }

  triggerScreen() {
    setter.clearScreenThenUpdate()
  }

  // NOTE
  // These functions return the values of the
  // state of the breakpoints and the
  // orientation values

  returnScreen() {
    return setter.returnScreen()
  }

  returnOrientation() {
    return setter.returnOrientation()
  }

  returnVariables() {
    return vars
  }

  dev() {
    options.dev()
  }
}

export const suspendors = new Suspendors()
