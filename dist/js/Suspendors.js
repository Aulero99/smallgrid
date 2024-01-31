import { caller } from "./FunctionCaller"
import { setter } from "./EventSetter"
import { sizer } from "./StylesSizer"


class Suspendors {
    setup(){
        caller.setup()
        sizer.setup()
        setter.setup()
    }

    setupSizerOnly(){ sizer.setup() }

    trigger(){ setter.update() }

    under(fn){ caller.setEventFlags(fn, 'under') }
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