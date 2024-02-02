import { caller } from "./FunctionCaller"
import { setter } from "./EventSetter"
import { sizer } from "./StylesSizer"
import { logger } from "./Logger"

    // NOTE
    // This is a automatic way to activate the scripts
    // and the variable allows for manual activation if
    // that is more desireable

let setupCalled = false

document.addEventListener('DOMContentLoaded', function() {
    if (setupCalled){ return }
    logger.log('DOM fully loaded and parsed');
    suspendors.setup()
});

class Suspendors {

        // NOTE
        // this function is called once the dom is
        // fully loaded, however it can be manually called
        // if so desired any time. for example, you
        // could activate the event liseners, then
        // call for an update in a later lifecycle
        // hook once you have set up the event 
        // listeners

    setup(){
        if (setupCalled){ return }
        setupCalled = true

        logger.log('suspendors online')
        caller.setup()
        sizer.setup()
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
        // orientation value

    returnScreen(){ setter.returnScreen()}
    returnOrientation(){ setter.returnOrientation()}

        // NOTE
        // These functions register the code that should
        // be run at the end of the loading of the dom
        // or once setup is called as well as at screen
        // transitions

    under(fn){console.log('registering', fn); caller.setEventFlags(fn, 'under') }
    sm(fn){ caller.setEventFlags(fn, 'sm') }
    md(fn){ caller.setEventFlags(fn, 'md') }
    lg(fn){ caller.setEventFlags(fn, 'lg') }
    xl(fn){ caller.setEventFlags(fn, 'xl') }
    xxl(fn){ caller.setEventFlags(fn, 'xxl') }
    over(fn){ caller.setEventFlags(fn, 'over') }
    landscape(fn){ caller.setEventFlags(fn, 'landscape') }
    portrait(fn){ caller.setEventFlags(fn, 'portrait') }
}

export const suspendors = new Suspendors()