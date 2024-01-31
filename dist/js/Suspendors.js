import { caller } from "./FunctionCaller"
import { logger } from "./Logger"
import { setter } from "./Setter"
import { sizer } from "./Sizer"


class Suspendors {
    setup(){
        caller.setup()
        sizer.setup()
        setter.setup()
    }

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