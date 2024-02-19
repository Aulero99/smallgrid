import { caller } from "./FunctionCaller"
import { setter } from "./EventSetter"
import { sizer } from "./StylesSizer"
import { logger } from "./Logger"
import { variables } from "../var/_variables"
import { modules } from "./Modules"

// NOTE
// This is a automatic way to activate the scripts
// and the variable allows for manual activation if
// that is more desireable

let setupCalled = false

class Suspendors {

        // NOTE
        // this function is called once the dom is
        // fully loaded, however it can be manually called
        // if so desired any time. for example, you
        // could activate the event listeners, then
        // call for an update in a later lifecycle
        // hook once you have set up the event 
        // listeners

    setup(){
        if (setupCalled){ return }
        setupCalled = true
        logger.log('Suspendors Online')
        
        // NOTE this must be first
        caller.setup()
        
        modules.setup()
        sizer.setup()

        // NOTE This must be last
        setter.setup()
    }

        // NOTE
        // This function turns on dev mode by
        // flipping the bool to true for logger.log to begin logging
    dev(){ 
        console.log('turning on dev mode')
        variables.devMode()
    }

        // NOTE
        // This is a simple tie in for the logger function to work with
        // the suspendors modules in version ^1.5
    log(data){
        logger.log(data)
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

    returnScreen(){ setter.returnScreen()}
    returnOrientation(){ setter.returnOrientation()}

        // NOTE
        // These functions register the code that should
        // be run at the end of the loading of the dom
        // or once setup is called as well as at screen
        // and orientation transitions

    under(fn){ 
        logger.log('registering function: ', fn, ' at breakpoint under')
        caller.setEventFlags(fn, 'under') 
    }
    sm(fn){
        logger.log('registering function: ', fn, ' at breakpoint sm')
        caller.setEventFlags(fn, 'sm') 
    }
    md(fn){
        logger.log('registering function: ', fn, ' at breakpoint md')
        caller.setEventFlags(fn, 'md') 
    }
    lg(fn){
        logger.log('registering function: ', fn, ' at breakpoint lg')
        caller.setEventFlags(fn, 'lg') 
    }
    xl(fn){ 
        logger.log('registering function: ', fn, ' at breakpoint xl')
        caller.setEventFlags(fn, 'xl') 
    }
    xxl(fn){ 
        logger.log('registering function: ', fn, ' at breakpoint xxl')
        caller.setEventFlags(fn, 'xxl') 
    }
    over(fn){
        logger.log('registering function: ', fn, ' at breakpoint over')
        caller.setEventFlags(fn, 'over') 
    }
    landscape(fn){
        logger.log('registering function: ', fn, ' at orientation landscape')
        caller.setEventFlags(fn, 'landscape') 
    }
    portrait(fn){
        logger.log('registering function: ', fn, ' at orientation portrait')
        caller.setEventFlags(fn, 'portrait')
    }
}

export const suspendors = new Suspendors()

document.addEventListener('DOMContentLoaded', function() {
    if (setupCalled){ return }
    logger.log('DOM fully loaded and parsed');
    suspendors.setup()
    this.removeEventListener
});