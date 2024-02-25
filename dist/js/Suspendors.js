import { setter } from "./EventSetter"
import { volSizer } from "./VolSizer"
import { logger } from "./Logger"
import { vars } from "../var/_variables"

class Suspendors {

    constructor(){ 
        logger.log('Suspendors Online')

        volSizer.setup()
        setter.setup()
    }

    setupSizerOnly(){ sizer.setup() }

        // NOTE
        // These are functions that will allow for
        // manual triggers of the current breakpoint
        // or orientation that will remain consistent
        // with all listeners and registered
        // functions

    triggerAll(){ setter.clearAllThenUpdate() }
    triggerOrientation(){ setter.clearOrientThenUpdate() }
    triggerScreen(){ setter.clearScreenThenUpdate() }

        // NOTE
        // These functions return the values of the
        // state of the breakpoints and the 
        // orientation values

    returnScreen(){ return setter.returnScreen()}
    returnOrientation(){ return setter.returnOrientation()}
    returnVariables(){ return vars }
}

export const suspendors = new Suspendors()